import { DadosPacientesSessao, Sessao, SituacaoSessao } from "../models/sessao"
import moment from "moment";
import { Paciente } from "../models/paciente";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/**
 * Controla o acesso a API
 */
const SessoesService = {

    /** BUSCA AS SESSÕES VINCULADA AO COORDENADOR  */
    buscarSessoes: async (coordenadorID: string) => {
        const sessoes: Sessao[] = [];

        try {
            
            const snapshots = await firestore().collection('sessoes').where('coordenadorUID', '==', coordenadorID).get()

            snapshots.forEach(snapshot => {
                sessoes.push(snapshot.data() as Sessao);
            })
            
            sessoes.sort((s1, s2) => (s1.data < s2.data ? -1 : 1))    
        } catch(e) {
            console.log(e)
        }

        return sessoes;
    },

    /**
     * Cadastra a sessão pelo coordenador
     * Apenas coordenador 
     * @param sessao 
     */
    cadastrar: async (sessao: Sessao) => {
        const retorno: {sucesso: boolean} = { sucesso: false };
        
        if (auth().currentUser) {
            const sessaoDOC = firestore().collection('sessoes').doc();
            sessao.id = sessaoDOC.id;
            sessao.coordenadorUID = auth().currentUser.uid;  
            console.log(sessao);
            await  sessaoDOC.set({...sessao}).then(() => retorno.sucesso = true );
        }
        return retorno;
    },

    /**
     * Atualiza a sessão pelo coordenador
     * Apenas coordenador
     * @param sessao 
     */
    atualizar: async (sessao: Sessao) => {
        const retorno: {sucesso: boolean} = { sucesso: false };
        if (sessao.id && auth().currentUser && (sessao.coordenadorUID == auth().currentUser.uid || sessao.dadosPacientes.map(p => p.pacienteUID).includes(auth().currentUser.uid))) {
            await  firestore().collection('sessoes').doc(sessao.id).update(JSON.parse(JSON.stringify(sessao))).then(() => retorno.sucesso = true );
        }
        return retorno;
    },

    /**
     * Excluir a sessão
     * Apenas coordenador
     * @param sessaoID 
     */
    excluir: async (sessao: Sessao) => {
        const retorno: {sucesso: boolean} = { sucesso: false };
        if (sessao.id && auth().currentUser && sessao.coordenadorUID == auth().currentUser.uid) {
            await firestore().collection('sessoes').doc(sessao.id).delete().then(() => retorno.sucesso = true );
        }
        return retorno;
    },

    /**
     * Busca as sessões que o usuário ainda não respondeu.
     */
    buscarSessoesAbertas: async(usuario: Paciente) => {
        let sessoesAbertas: Sessao[] = [];
        const sessoes = await SessoesService.buscarSessoes(usuario.coordenadorUID)
        
        sessoes.forEach((sessao:Sessao, index) => {

            const pacienteIndex = sessao.dadosPacientes.map(p => p.pacienteUID).indexOf(usuario.uid);
            //Achou paciente
            if (pacienteIndex >= 0 && sessao.data <= moment().format('YYYY-MM-DD') && !sessao.dadosPacientes[pacienteIndex].opiniao) {
                sessoesAbertas.push(sessao);
            }
        })

        return sessoesAbertas;
    }


}

export const useSessoesService = () => SessoesService;