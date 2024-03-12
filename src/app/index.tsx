import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { AppConfig } from '../config/app';
import { AppColors } from '../templates/colors';
import { usePacienteContext } from '../contexts/paciente-context';
import { Paciente } from '../models/paciente';
import { auth } from '../config/firebase';
import { useUsuariosService } from '../services/usuarios.service';

export default function Initial (props) {

    const { setUsuario } = usePacienteContext();
    const usuarioSrv = useUsuariosService();
    // =============================================
    useEffect(() => {
        //Redireciona para tela de login
        (async () => {
            auth.onAuthStateChanged(async (user) => {
                if (!user) 
                    router.replace('/login')
                else {
                    const { logado, paciente, nivel } = await usuarioSrv.buscarUsuarioLogado();

                    //Falha login
                    if (!logado) {
                        router.replace('/login')
                    }
              
                    //Logado como Coordenador
                    if (nivel == 'coordenador') router.replace('/coordenador/pacientes')
                    else {
                      setUsuario(paciente)
                      if (paciente?.primeiroAcesso)
                          router.replace('/pacientes/questionarios/primeiro-acesso')
                      else
                          router.replace('/pacientes/questionarios/diario')
                    } 
                }
            })
        })()
    }, []);

    // ==============================================
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: AppColors.lightgrey}}>
         <Text style={{fontSize: 20, margin: 10}}>{AppConfig.nome}</Text>
         <Text>{AppConfig.versao}</Text>
         <Text>{AppConfig.autor}</Text>
      </View>
    );
}
