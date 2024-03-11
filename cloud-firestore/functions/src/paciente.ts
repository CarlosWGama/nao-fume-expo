import { Questionario } from './questionario';

/**
 * Classe com acesso ao dados do paciente
 */
export class Paciente {

     // Lista a posição do paciente em relação aos demais
    public rank: number = 0;
    public senha: string = '';

    constructor(public uid?: string, public nome?: string, public codigo?: number,
                public mediaCigarros: number = 0, public precoCigarro: number = 0.10,
                public coordenadorUID?: string, public ultimoDiaRespondido?: string,
                public avatar: number = 1,
                public cigarrosEvitados: number = 0, public diasSeguidosSemFumar: number = 0,
                public diasSemFumar: number = 0, public maxDiasSemFumar: number = 0,
                public dinheiroAcumulado: number = 0, public dinheiroDisponivel: number = 0,
                public primeiroAcesso: boolean = true,
                public diasPraticoExercicio: number = 0, public excluido: boolean = false,
                public questionariosDiarios: Questionario[] = [],
                public conquistasAlcancadas: string[] = []) { }
}

//função para retornar o avatar selecionado
export const avatarURL = (avatar: number) => {
    switch(avatar) {
        case 1: return require('./../assets/imgs/avatars/1.jpg');
        case 2: return require('./../assets/imgs/avatars/2.jpg');
        case 3: return require('./../assets/imgs/avatars/3.jpg');
        case 4: return require('./../assets/imgs/avatars/4.jpg');
        case 5: return require('./../assets/imgs/avatars/5.jpg');
        case 6: return require('./../assets/imgs/avatars/6.jpg');
        case 7: return require('./../assets/imgs/avatars/7.jpg');
        case 8: return require('./../assets/imgs/avatars/8.jpg');
        case 9: return require('./../assets/imgs/avatars/9.jpg');
        case 10: return require('./../assets/imgs/avatars/10.jpg');
        case 11: return require('./../assets/imgs/avatars/11.jpg');
        default: return require('./../assets/imgs/avatars/12.jpg');
    }
}
