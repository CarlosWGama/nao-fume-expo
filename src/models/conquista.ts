/**
 * Estrutura das Conquistas dos usuários
 * @author Carlos W. Gama
 * @version 1.0.0
 */
export class Conquista {
    constructor(public codigo: string, public titulo: string, public descricao: string, public imagem: any) {}
}

/**
 * Recuper ao caminho da imagem
 * @param imagem 
 * @returns caminho da imagem
 */
export function buscarImagem(imagem: 'exercise.png'|'no-smoking.png'|'money.png') {
    if (imagem == 'exercise.png') return require('./../assets/imgs/conquistas/exercise.png');
    if (imagem == 'no-smoking.png') return require('./../assets/imgs/conquistas/no-smoking.png');
    if (imagem == 'money.png') return require('./../assets/imgs/conquistas/money.png');
}
