import { Paciente } from "../models/paciente";

/**
 * Controla o acesso a API
 */
const PacientesService = {

    /* BUSCA OS PACIENTES VINCULADOS AO COORDENADOR */
    buscarPacientes: async () => {
        return [
            new Paciente('12312', 'Carlos Alberto', 1, 10, 0.1, '111', '2024-02-20', 1, 20, 4, 2, 2, 100.00, 150.00, false, 2, false, []),
            new Paciente('12312', 'Maria', 2, 10, 0.1, '111', '2024-02-20', 2, 20, 4, 2, 2, 100.00, 150.00, false, 2, false, []),
            new Paciente('12312', 'Jose', 3, 10, 0.1, '111', '2024-02-20', 3, 20, 4, 2, 2, 100.00, 150.00, false, 2, false, []),
    ]}
}

export const usePacientesService = () => PacientesService;