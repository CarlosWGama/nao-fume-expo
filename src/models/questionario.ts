/**
 * Questionário com os atributos das perguntas diarias
 */
export class Questionario {

    /**
     * @param dia | Dia da consulta (YYYY-MM-DD)
     * @param humor | Como foi o humor do paciente 0 -> Baixo, 1 -> Médio, 2 -> Bom
     * @param fumou | Se fumou naquele dia,
     * @param cigarros | Quantidade de cigarros
     * @param exercitou  | Se praticou exercicio
     * @param vontadeFumar | Vontade de fumar 0 -> Baixa, 1 -> Normal, 2 -> Alta
     */
    constructor(public dia?: string,
                public humor?: 0|1|2,
                public fumou?: boolean,
                public cigarros: number = 0,
                public exercitou?: boolean,
                public vontadeFumar?: 0|1|2) { }
}
