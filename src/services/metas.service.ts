import { Meta } from "../models/meta";

/**
 * Controla o acesso a API
 */
const MetasService = {

    /* BUSCA OS METAS VINCULADOS AO COORDENADOR */
    buscarMetas: async () => {
        return [
            new Meta('Cinema', 50, false, '2', '1'),
            new Meta('Lapis', 2, false, '2', '2'),
            new Meta('Borra', 10, true, '2', '3'),
    ]},

    /**
     * Cadastra uma nova meta
     * @param meta 
     */
    cadastrar: async (meta: Meta) => {

    },

    /**
     * Remove uma meta 
     * @param meta 
     */
    remover: async(meta: Meta) => {
        console.log(meta)
    },

    /**
     * Usa uma meta 
     * @param meta 
     */
    usar: async(meta: Meta) => {
        console.log(meta)
    }
}

export const useMetasService = () => MetasService;