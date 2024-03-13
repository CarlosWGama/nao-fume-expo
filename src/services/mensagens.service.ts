import { Mensagem } from "../models/mensagem";
import moment from "moment";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

//Quantidade máxima de mensagem por chat
const LIMITE = 100;
/**
 * Controla o acesso a API
 */
const MensagensService = {

    /* BUSCA OS PACIENTES VINCULADOS AO COORDENADOR */
    buscarMensagens: async (coordenadorUID) => {
        let mensagens: Mensagem[] = [];
        const snapshot = await getDoc(doc(db, 'avisos', coordenadorUID))
        if (snapshot.exists()) 
            mensagens = snapshot.data()?.mensagens as Mensagem[];
        return mensagens;
    },

    /* ENVIA UMA MENSAGEM PARA O CHAT */
    enviar: async (codigo, coordenadorUID, mensagem) => {
        const retorno = { sucesso: false, mensagens: []}
        try {
            let mensagens: Mensagem[] = [];
            const snapshot = await getDoc(doc(db, 'avisos', coordenadorUID))
            if (snapshot.exists())  
                mensagens = snapshot.data()?.mensagens as Mensagem[];
            if (!mensagens) mensagens = [];
            
            mensagens.push(new Mensagem(codigo, mensagem, moment().format('YYYY-MM-DD')))
    
            while (mensagens.length > LIMITE) 
                mensagens.shift();
    
            setDoc(doc(db, 'avisos', coordenadorUID), {mensagens: [...JSON.parse(JSON.stringify(mensagens))]}) 
            retorno.mensagens = mensagens;
            retorno.sucesso = true;
        } catch (e) {
            console.log(e)
        }
        return retorno;
    }
}

export const useMensagensService = () => MensagensService;