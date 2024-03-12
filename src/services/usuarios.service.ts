import { getAuth, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { Paciente } from '../models/paciente';
import { auth, db } from '../config/firebase';


/**
 * Controla o acesso a API
*/
const UsuariosService = {
    
    /* Realiza o login de usuário */
    logar: async (codigo: number, senha: string) => {
        
        const retorno: { logado: boolean, paciente?: Paciente, nivel: 'coordenador'|'paciente'} = { logado: false, nivel: 'coordenador' };
        const email = `${codigo}@cwg.services`;

        try {
            const autenticacao = (await signInWithEmailAndPassword(auth, email, senha)).user;
            const snapshot = await getDoc(doc(db, 'usuarios', autenticacao.uid));
            if (snapshot.exists()) {
                const usuario = snapshot.data();

                //Logado
                if (usuario.excluido == false) {
                    retorno.logado = true;

                    //Se paciente, buscar dados 
                    if (usuario.nivel == 1) {
                        retorno.paciente = (await getDoc(doc(db, 'pacientes', autenticacao.uid))).data() as Paciente;
                        retorno.nivel = 'paciente';
                    }
                    
                }
            }
            
        } catch (e) {
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
        if (auth.currentUser) {   
            try {
                const snapshot = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
                if (snapshot.exists()) {
                    const usuario = snapshot.data();

                    //Logado
                    if (usuario.excluido == false) {
                        retorno.logado = true;

                        //Se paciente, buscar dados 
                        if (usuario.nivel == 1) {
                            retorno.paciente = (await getDoc(doc(db, 'pacientes', auth.currentUser.uid))).data() as Paciente;
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
        await updatePassword(auth.currentUser, senha);
    }
}

export const useUsuariosService = () => UsuariosService;