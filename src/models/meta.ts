/**
 * Define a meta financeira de um paciente
 */
export class Meta {
    constructor(public titulo?: string, public objetivo?: number,
                public usado: boolean = false, public pacienteUID?: string,
                public uid?: string) {}
}
