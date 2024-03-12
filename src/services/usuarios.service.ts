import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
            console.log(autenticacao);
            const snapshot = await getDoc(doc(db, 'usuarios', autenticacao.uid));
            if (snapshot.exists()) {
                const usuario = snapshot.data();
                console.log(usuario);

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
     * Altera a senha do usuário logado
     * @param senha 
     */
    alterarSenha: async (senha: string) => {

    }
}

export const useUsuariosService = () => UsuariosService;