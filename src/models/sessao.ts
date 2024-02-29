/**
 * Armazena os dados da sessão
 */
export class Sessao {
    /**
     * 
     * @param id 
     * @param data 
     * @param disponivel | Se a sessão já está disponivel para o pessoal resposnder 
     * @param dadosPacientes 
     */
    constructor(public id?:string, public data?:string, public coordenadorUID?:string, public disponivel:boolean = false, public dadosPacientes: DadosPacientesSessao[] = [], public excluido:boolean = false) {}

    /**
     * Checa se o paciente esteve presente
     */
    public presente(pacienteID:string):boolean {
        let presente = false;
        this.dadosPacientes.forEach(p => {
            if (p.pacienteUID = pacienteID) {
                presente = p.presente;
                return;
            }
        })
        return presente;
    }

    get totalPacientes():number {
        return this.dadosPacientes.length;
    }

    get totalPresentes():number {
        return this.dadosPacientes.reduce((acumulador, p) => {
            if (p.presente) acumulador++;
            return acumulador;
        }, 0);
    }
}

/**
 * 
 */
export class DadosPacientesSessao {

    constructor(public pacienteUID?:string, public presente:boolean = false, public nome:string|null = null, public situacao:SituacaoSessao|null = null, public opiniao:string|null = null) {}
}

/**
 * ENUM da Situação do Paciente
 */
export enum SituacaoSessao {
    ABSTINENTE = 1,
    FUMANDO = 2,
    MANUTENCAO = 3
}