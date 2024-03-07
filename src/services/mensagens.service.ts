import { Mensagem } from "../models/mensagem";
import { Paciente } from "../models/paciente";

/**
 * Controla o acesso a API
 */
const MensagensService = {

    /* BUSCA OS PACIENTES VINCULADOS AO COORDENADOR */
    buscarMensagens: async () => {
        return [
            new Mensagem(1, 'Teste 123', '2024-03-01', 'aaa', 'aaa', 'asdasdasd'),    
            new Mensagem(2, 'Olá tudo bem?', '2024-03-02', 'bbb', 'bbb', 'asdasdasd'),    
            new Mensagem(3, 'Tudo certo! E com você', '2024-03-02', 'ccc', 'ccc', 'asdasdasd'),    
            new Mensagem(4, 'Está tudo ótimo! mensagem bem grande para ver se o texto quebra conforme eu quero', '2024-03-03', 'ddd', 'ddd', 'asdasdasd'),    
        ]
    },

    /* ENVIA UMA MENSGAEM PARA O CHAT */
    enviar: async (usuarioID, mensagem) => {

    }
}

export const useMensagensService = () => MensagensService;