/**
 * Armazena a mensagem enviada no chat
 * @author Carlos W. Gama
 * @version 1.0.0
 */
export class Mensagem {

    constructor(public pacienteCodigo?: number, public mensagem?: string, public data?: string, public uid?: string, public pacienteUID?: string, public coordenadorUID?: string) {}
}
