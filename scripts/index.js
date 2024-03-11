import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { scriptFirebaseConfig } from './config-firebase.js';

const app = initializeApp(scriptFirebaseConfig);
const db = getFirestore();
const auth = getAuth();

async function criarAdmin() {
    console.log('---- CRIANDO ADMIN -----');
    try {
        // =========== Busca o contador ========= //
        const configData = (await getDoc(doc(db, 'config', 'usuarios'))).data();
        let { totalUsuarios } = configData;
        totalUsuarios++;
        const codigo = totalUsuarios;
        console.log('Código:', codigo);
        
        // =========== Busca o contador ========= //
        const email = `${codigo}@cwg.services`;
        const password =  '123456';
        const usuario = (await createUserWithEmailAndPassword(auth, email, password)).user;
        console.log('EMAIL CRIADO');
        console.log(` - Email ${email}`);
        console.log(` - Senha: ${password}`);
        console.log(` - UID: ${usuario.uid}`);

        // =========== SALVANDO USUARIO ========= //
        setDoc(doc(db, 'usuarios', usuario.uid), {
            codigo,
            excluido: false,
            nivel: 2, //admin
            uid: usuario.uid
        })
    
        //Atualiza a contagem de usuário
        updateDoc(doc(db, 'config', 'usuarios'), { totalUsuarios })
    } catch(e) {
        console.log("FALHA NO PROCESSO");
        console.log(e);
    }

    console.log('FIM - CRIAR USUÁRIOS');
}

console.log('ESCOLHA O QUE SERÁ EXECUTADO: ')
//criarAdmin();
console.log('[FIM]')
