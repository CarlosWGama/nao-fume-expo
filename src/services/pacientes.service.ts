import { Paciente } from "../models/paciente";
import { getDoc, getDocs, doc, setDoc, updateDoc, query, where, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, functions } from "../config/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";


/**
 * Controla o acesso a API
*/
const PacientesService = {
    
    /* BUSCA OS PACIENTES VINCULADOS AO COORDENADOR */
    buscarPacientes: async () => {
        const pacientes: Paciente[]  = [];
        const snaphosts = await getDocs(query(collection(db, 'pacientes'), where('coordenadorUID', '==', auth.currentUser?.uid)));
        snaphosts.forEach(snap => {
            pacientes.push(snap.data() as Paciente);
        })

        return pacientes;
    
    },

    /**
     * Realiza o cadastro de um paciente pelo coordenador
     * @param paciente 
     */
    cadastrar: async (paciente: Paciente) => {
        let retorno: {sucesso: boolean, codigo?: number } = { sucesso: false }
        try {
            paciente.avatar = paciente.genero == 'M' ? 1 : 7;
            //Envia solicitação para o servidor
            const criarPaciente = httpsCallable(functions, 'criarPaciente');
            await criarPaciente(paciente).then((result:any) => {
                const response = JSON.parse(result.data);
                if (response.sucesso) 
                    retorno = { sucesso: true, codigo: response.codigo }
              })
            .catch(e => {
                console.log('erro:')
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }

        return retorno;

    },

    /**
     * Atualiza os dados  base do paciente
     * @param paciente 
     */
    atualizar: async (paciente: Paciente) => {
        const retorno: {sucesso: boolean } = { sucesso: false }
        //Verifica se pode atualizar
        try {
            const usuario = auth.currentUser;
            //Só pode alterar se for o coordenador ou o próprio usuário
            if (paciente.uid == usuario?.uid || paciente.coordenadorUID == usuario?.uid) {
                if (paciente.senha) {
                    console.log('TROCOU SENHA');
                    const alterarSenha = httpsCallable(functions, 'alterarSenha');
                    await alterarSenha({usuarioID: paciente.uid, senha: paciente.senha});
                }
                delete paciente.senha;
                console.log(JSON.parse(JSON.stringify(paciente)));
                await updateDoc(doc(db, 'pacientes', paciente.uid), JSON.parse(JSON.stringify(paciente)));
                retorno.sucesso = true;
            }
        } catch(e) {
            console.log('Erro', e);
        }

        return retorno;
    }
}

export const usePacientesService = () => PacientesService;