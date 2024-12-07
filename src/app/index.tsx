import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { AppConfig } from '../config/app';
import { AppColors } from '../templates/colors';
import { usePacienteContext } from '../contexts/paciente-context';
import { Paciente } from '../models/paciente';
import auth from '@react-native-firebase/auth';
import { useUsuariosService } from '../services/usuarios.service';
import * as Updates from 'expo-updates';

export default function Initial (props) {

    const { setUsuario } = usePacienteContext();
    const usuarioSrv = useUsuariosService();
    // =============================================
    useEffect(() => {      
        (async () => {
            // =========== PROCURA POR ATUALIZAÇÕES =============== //
            // try {
            //     const update = await Updates.checkForUpdateAsync();
          
            //     if (update.isAvailable) {
            //       await Updates.fetchUpdateAsync();
            //       await Updates.reloadAsync();
            //     } else {
                
            //     }
            // } catch (error) {
                //     alert(`Erro no update: ${error}`);
                // }
            
            // =========== AGUARDA O MENU =============== //
            await new Promise(resolve => setTimeout(resolve, 3000));


            // =========== DIRECIONA O USUÁRIO =============== //
            auth().onAuthStateChanged(async (user) => {
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
         <Text>Seli Sousa Mello de Almeida</Text>
         <Text>Sonia Maria Soares Ferreira</Text>
         <Text>Carlos W. Gama</Text>
         <Text>Robbysson Cayke de Sousa Pereira</Text>
         <Text>Evanisa Helena Maio de Brum</Text>
         <Text>Leticia Costa Queiroz</Text>
      </View>
    );
}
