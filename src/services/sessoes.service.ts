import { DadosPacientesSessao, Sessao, SituacaoSessao } from "../models/sessao"

/**
 * Controla o acesso a API
 */
const SessoesService = {

    /* BUSCA AS SESSÕES VINCULADA AO COORDENADOR */
    buscarSessoes: async () => {
        return [new Sessao('1', '2024-02-01', '123123', true, [new DadosPacientesSessao('12312', true, 'Carlos Alberto Correia Lessa Filho aaaa aaaaa aaa', SituacaoSessao.ABSTINENTE, 'aaaaa'), new DadosPacientesSessao('12312', false, 'Carlos', SituacaoSessao.ABSTINENTE, 'aaaaa')], false),
        new Sessao('2', '2024-03-02', '123123', true, [new DadosPacientesSessao('12312', false, 'Maria', SituacaoSessao.FUMANDO)], false),
    ]}
}

export const useSessoesService = () => SessoesService;