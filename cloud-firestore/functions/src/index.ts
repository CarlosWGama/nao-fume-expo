
import { onCall }  from "firebase-functions/v2/https";
// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { Paciente } from "./paciente";

initializeApp()

//firebase deploy --only functions
//firebase deploy --only functions:addMessage
//firebase functions:delete criarPaciente alterarSenha alterarPaciente


exports.criarPaciente = onCall({ cors: [/firebase\.com$/, "flutter.com"] }, async (request) => {
       
    return await getFirestore().collection('config').get().then(async snapshot => {
        let retorno: {sucesso: boolean, erro?: string, codigo?: number } = {sucesso: false };
        const config = snapshot.docs[0]
        let total = config.data().totalUsuarios;
        const codigo = ++total;
        const email = codigo+'@cwg.services';
        const nivel = 1;
        const nome = request.data.nome;
        const senha = request.data.senha;
        const coordenadorUID = request.auth?.uid;
        const ultimoDiaRespondido = request.data.ultimoDiaRespondido;
        const mediaCigarros = Number.parseInt(request.data.mediaCigarros);
        const precoCigarro = Number.parseFloat(request.data.precoCigarro);
        
        if (!nome)  retorno = {sucesso:false, erro:'Informar o nome do usuário'};
        else if (!senha) retorno = {sucesso:false, erro:'Informe a senha do paciente'};
        else if (!precoCigarro) retorno =  {sucesso:false, erro:'Informe o preço do cigarro'};
        else if (!mediaCigarros) retorno = {sucesso:false, erro:'Informe a media de cigarros'};
        else if (!coordenadorUID) retorno = {sucesso:false, erro:'Informar o código do coordenador'};
        else {
            
            await getAuth().createUser({
                email: email,
                password: senha,
                // photoURL: '/assets/imgs/avatars/0.png',
                displayName: nome
            }).then(async usuario => {
                const userID = usuario.uid;
                //Cria o usuário
                await getFirestore().collection('usuarios').doc(userID).set({
                    codigo:codigo,
                    nivel: nivel,
                    nome:nome,
                    uid: userID,
                    excluido:false
                }).then(async () => {
                    
                    //Cria o paciente
                    const paciente = new Paciente(userID, nome, codigo, mediaCigarros, precoCigarro, coordenadorUID, ultimoDiaRespondido)
                    await getFirestore().collection('pacientes').doc(userID).set(Object.assign({}, paciente)).catch(() => {retorno = {sucesso:false, erro: 'Criar paciente'}})
                    
                    //Atualiza o total de usuários cadastrados
                    await config.ref.update({totalUsuarios:codigo}).catch(() => {retorno = {sucesso:false, erro: 'Atualizar contagem'}})
                    retorno = {sucesso:true, codigo}                    
                    
                }).catch((erro) => {retorno = {sucesso:false, erro: erro}})
                
            }).catch(erro => {
                console.log(erro);
                retorno = {sucesso:false, erro: erro}
            })
        }
        return JSON.stringify(retorno);
    })
    
})

exports.alterarSenha = onCall({ cors: [/firebase\.com$/, "flutter.com"] }, async (request) => {
    const usuarioID = request.data.usuarioID;
    const novaSenha = request.data.senha;
    const userID = request.auth?.uid as string;
    
    getFirestore().collection('usuarios').doc(userID).get().then(doc => {
        const usuario = doc.data();
        if (usuario !== undefined && usuario.nivel === 1) { //Coordenador
            return getAuth().updateUser(usuarioID, {
                password: novaSenha
            })
        }
        return null; 
    }).catch((erro:any) => null)
    
});

exports.alterarPaciente = onCall({ cors: [/firebase\.com$/, "flutter.com"] }, async (request) => {
    // return corsHandler(request, response, () => { 
    let retorno: {sucesso: boolean, erro?: string, codigo?: number} = {sucesso: false };

    const coordenadorUID = request.auth?.uid;
    const nome = request.data.nome;
    const novaSenha = request.data.senha;
    const ultimoDiaRespondido = request.data.ultimoDiaRespondido;
    const pacienteID = request.data.pacienteID;
    const mediaCigarros = Number.parseInt(request.data.mediaCigarros);
    const precoCigarro = Number.parseFloat(request.data.precoCigarro);
    
    if (!pacienteID)  retorno = {sucesso:false, erro:'Informar o UID do Paciente'};
    else if (!nome)  retorno = {sucesso:false, erro:'Informar o nome do usuário'};
    else if (!precoCigarro) retorno = {sucesso:false, erro:'Informe o preço do cigarro'};
    else if (!mediaCigarros) retorno = {sucesso:false, erro:'Informe a media de cigarros'};
    else if (!coordenadorUID) retorno = {sucesso:false, erro:'Informar o código do coordenador'};
    else if (!ultimoDiaRespondido) retorno = {sucesso:false, erro:'Informar o próximo dia do questionário'};
    else {
        
        await getFirestore().collection('pacientes')
            .where('coordenadorUID', '==', coordenadorUID)
            .where('uid', '==', pacienteID)
            .get().then((snapshot: any):void => {
                if (snapshot.empty) {
                    retorno = {sucesso:false, erro:'Paciente não encontrado'}
                } else {
                    const pacienteDOC = snapshot.docs[0];
                    let atualizar = {displayName:nome}
                    if (novaSenha) atualizar = Object.assign(atualizar, {password:novaSenha});
                    
                    getAuth().updateUser(pacienteID, atualizar).then().catch()
                    
                    return pacienteDOC.ref.update({
                        nome:nome,
                        precoCigarro:precoCigarro,
                        mediaCigarros:mediaCigarros,
                        ultimoDiaRespondido:ultimoDiaRespondido
                    })
                    .then(() => {retorno = {sucesso:true}})
                    .catch((erro:any) => { retorno = {sucesso:false, erro:'Paciente não encontrado'}});
                }
                
            }).catch((erro:any) => { retorno = {sucesso:false, erro:'Paciente não encontrado'}});     
    }   
    return JSON.stringify(retorno);
});
