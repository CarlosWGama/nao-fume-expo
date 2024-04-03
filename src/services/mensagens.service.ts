import { Mensagem } from "../models/mensagem";
import moment from "moment";
import firestore from '@react-native-firebase/firestore';

//Quantidade máxima de mensagem por chat
const LIMITE = 100;
/**
 * Controla o acesso a API
 */
const MensagensService = {

    /* BUSCA OS PACIENTES VINCULADOS AO COORDENADOR */
    buscarMensagens: async (coordenadorUID) => {
        let mensagens: Mensagem[] = [];
        const snapshot = await firestore().collection('avisos').doc(coordenadorUID).get()
        if (snapshot.exists) 
            mensagens = snapshot.data()?.mensagens as Mensagem[];
        return mensagens;
    },

    /* ENVIA UMA MENSAGEM PARA O CHAT */
    enviar: async (codigo, coordenadorUID, mensagem) => {
        const retorno = { sucesso: false, mensagens: []}
        try {
            let mensagens: Mensagem[] = [];
            const avisosDOC = firestore().collection('avisos').doc(coordenadorUID);
            const snapshot = await avisosDOC.get();
            if (snapshot.exists)  
                mensagens = snapshot.data()?.mensagens as Mensagem[];
            if (!mensagens) mensagens = [];
            
            mensagens.push(new Mensagem(codigo, mensagem, moment().format('YYYY-MM-DD')))
    
            while (mensagens.length > LIMITE) 
                mensagens.shift();
    
            avisosDOC.set({mensagens: [...JSON.parse(JSON.stringify(mensagens))]}) 
            retorno.mensagens = mensagens;
            retorno.sucesso = true;
        } catch (e) {
            console.log(e)
        }
        return retorno;
    }
}

export const useMensagensService = () => MensagensService;