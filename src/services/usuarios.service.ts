
import { Paciente } from '../models/paciente';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



/**
 * Controla o acesso a API
*/
const UsuariosService = {
    
    /* Realiza o login de usuário */
    logar: async (codigo: number, senha: string) => {
        
        const retorno: { logado: boolean, paciente?: Paciente, nivel: 'coordenador'|'paciente'} = { logado: false, nivel: 'coordenador' };
        const email = `${codigo}@cwg.services`;

        try {
            const autenticacao = (await auth().signInWithEmailAndPassword(email, senha)).user;
            const snapshot = await  firestore().collection('usuarios').doc(autenticacao.uid).get();
            if (snapshot.exists) {
                const usuario = snapshot.data();

                //Logado
                if (usuario.excluido == false) {
                    retorno.logado = true;

                    //Se paciente, buscar dados 
                    if (usuario.nivel == 1) {
                        retorno.paciente = (await firestore().collection('pacientes').doc(autenticacao.uid).get()).data() as Paciente;
                        retorno.nivel = 'paciente';
                    }
                    
                }
            }
            
        } catch (e) {
            console.log(e)
            console.log('Erro login')
        }


        return retorno;
    },

    /**
     * Retorna os dados od usuário que está logado
     * @returns 
     */
    buscarUsuarioLogado: async () => {
        const retorno: { logado: boolean, paciente?: Paciente, nivel: 'coordenador'|'paciente'} = { logado: false, nivel: 'coordenador' };
        if (auth().currentUser) {   
            try {
                const snapshot = await firestore().collection('usuarios').doc(auth().currentUser.uid).get();
                if (snapshot.exists) {
                    const usuario = snapshot.data();

                    //Logado
                    if (usuario.excluido == false) {
                        retorno.logado = true;

                        //Se paciente, buscar dados 
                        if (usuario.nivel == 1) {
                            retorno.paciente = (await firestore().collection('pacientes').doc(auth().currentUser.uid).get()).data() as Paciente;
                            retorno.nivel = 'paciente';
                        } 
                    }
                }
            } catch (e) {
                console.log('Erro login')
            }
        }

        return retorno;
    },

    /**
     * Altera a senha do usuário logado
     * @param senha 
     */
    alterarSenha: async (senha: string) => {
        await auth().currentUser.updatePassword(senha);
    }
}

export const useUsuariosService = () => UsuariosService;