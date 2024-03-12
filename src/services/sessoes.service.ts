import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { DadosPacientesSessao, Sessao, SituacaoSessao } from "../models/sessao"

/**
 * Controla o acesso a API
 */
const SessoesService = {

    /** BUSCA AS SESSÕES VINCULADA AO COORDENADOR  */
    buscarSessoes: async (coordenadorID: string) => {
        const sessoes: Sessao[] = [];

        const snapshots = await getDocs(query(collection(db, 'sessoes'), where('coordenadorUID', '==', coordenadorID)))
        snapshots.forEach(snapshot => {
            sessoes.push(snapshot.data() as Sessao);
        })

        return sessoes;
    },

    /**
     * Cadastra a sessão pelo coordenador
     * Apenas coordenador 
     * @param sessao 
     */
    cadastrar: async (sessao: Sessao) => {
        const retorno: {sucesso: boolean} = { sucesso: false };
        
        if (auth.currentUser) {
            const sessaoDOC = doc(collection(db, 'sessoes'));
            sessao.id = sessaoDOC.id;
            sessao.coordenadorUID = auth.currentUser.uid;  
            console.log(sessao);
            await setDoc(sessaoDOC, {...sessao}).then(() => retorno.sucesso = true );
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
        if (sessao.id && auth.currentUser && sessao.coordenadorUID == auth.currentUser.uid) {
            await updateDoc(doc(db, 'sessoes', sessao.id), JSON.parse(JSON.stringify(sessao))).then(() => retorno.sucesso = true );
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
        if (sessao.id && auth.currentUser && sessao.coordenadorUID == auth.currentUser.uid) {
            await deleteDoc(doc(db, 'sessoes', sessao.id)).then(() => retorno.sucesso = true );
        }
        return retorno;
    }


}

export const useSessoesService = () => SessoesService;