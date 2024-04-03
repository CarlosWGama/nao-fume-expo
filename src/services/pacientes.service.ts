import { Paciente } from "../models/paciente";
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


/**
 * Controla o acesso a API
*/
const PacientesService = {
    
    /* BUSCA OS PACIENTES VINCULADOS AO COORDENADOR */
    buscarPacientes: async () => {
        const pacientes: Paciente[]  = [];
        try {
            console.log('a');
            const snaphosts = await firestore().collection('pacientes').where('coordenadorUID', '==', auth().currentUser?.uid).get();
            snaphosts.forEach(snap => {
                pacientes.push(snap.data() as Paciente);
            })
        } catch (e) {
            console.log(e)
        }

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
            const criarPaciente = functions().httpsCallable('criarPaciente');
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
            const usuario = auth().currentUser;
            //Só pode alterar se for o coordenador ou o próprio usuário
            if (paciente.uid == usuario?.uid || paciente.coordenadorUID == usuario?.uid) {
                if (paciente.senha) {
                    console.log('TROCOU SENHA');
                    const alterarSenha = functions().httpsCallable('alterarSenha');
                    await alterarSenha({usuarioID: paciente.uid, senha: paciente.senha});
                }
                delete paciente.senha;
                console.log(JSON.parse(JSON.stringify(paciente)));
                await firestore().collection('pacientes').doc(paciente.uid).update(JSON.parse(JSON.stringify(paciente)));
                retorno.sucesso = true;
            }
        } catch(e) {
            console.log('Erro', e);
        }

        return retorno;
    }
}

export const usePacientesService = () => PacientesService;