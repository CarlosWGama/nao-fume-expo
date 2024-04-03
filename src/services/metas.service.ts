import { Meta } from "../models/meta";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
/**
 * Controla o acesso a API
 */
const MetasService = {

    /* BUSCA OS METAS VINCULADOS AO COORDENADOR */
    buscarMetas: async () => {
        const metas: Meta[] = [];

        if (auth().currentUser?.uid) {
            const snapshots = await firestore().collection('metas').where('pacienteUID', '==', auth().currentUser.uid).get();
            snapshots.forEach(snap => {
                metas.push(snap.data() as Meta)
            })
        }
        console.log(metas);
        return metas;
    },

    /**
     * Cadastra uma nova meta
     * @param meta 
     */
    cadastrar: async (meta: Meta) => {
        const retorno = { sucesso: false }
        try {
            if (auth().currentUser?.uid) {
                const metaDOC =  firestore().collection('metas').doc();
                meta.pacienteUID = auth().currentUser.uid;
                meta.uid = metaDOC.id;
                
                await metaDOC.set({...meta})
                retorno.sucesso = true;
            }
        } catch(e) {
            console.log(e)
        }
        return retorno;    },

    /**
     * Remove uma meta 
     * @param meta 
     */
    remover: async(meta: Meta) => {
        const retorno = { sucesso: false }
        try {
            if (auth().currentUser?.uid && meta.uid) {
                await firestore().collection('metas').doc(meta.uid).delete();
                retorno.sucesso = true;
            }
        } catch(e) {
            console.log(e)
        }
        return retorno;
    },

    /**
     * Usa uma meta 
     * @param meta 
     */
    usar: async(meta: Meta) => {
        const retorno = { sucesso: false }

        if (auth().currentUser?.uid && meta.uid) {
            await firestore().collection('metas').doc(meta.uid).update({usado: true});
            retorno.sucesso = true;
        }
        return retorno;
    }
}

export const useMetasService = () => MetasService;