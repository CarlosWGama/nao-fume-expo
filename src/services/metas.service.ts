import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Meta } from "../models/meta";
import { auth, db } from "../config/firebase";

/**
 * Controla o acesso a API
 */
const MetasService = {

    /* BUSCA OS METAS VINCULADOS AO COORDENADOR */
    buscarMetas: async () => {
        const metas: Meta[] = [];

        if (auth.currentUser?.uid) {
            const queryRef = query(collection(db, 'metas'), where('pacienteUID', '==', auth.currentUser.uid))
            const snapshots = await getDocs(queryRef)
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
            if (auth.currentUser?.uid) {
                const metaDOC = doc(collection(db, 'metas'));
                meta.pacienteUID = auth.currentUser.uid;
                meta.uid = metaDOC.id;
                console.log(meta);
                await setDoc(metaDOC, {...meta})
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
            if (auth.currentUser?.uid && meta.uid) {
                await deleteDoc(doc(db, 'metas', meta.uid));
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

        if (auth.currentUser?.uid && meta.uid) {
            await updateDoc(doc(db, 'metas', meta.uid), {usado: true});
            retorno.sucesso = true;
        }
        return retorno;
    }
}

export const useMetasService = () => MetasService;