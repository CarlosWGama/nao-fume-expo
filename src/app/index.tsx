import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { AppConfig } from '../config/app';
import { AppColors } from '../templates/colors';
import { usePacienteContext } from '../contexts/paciente-context';
import { Paciente } from '../models/paciente';

export default function Initial (props) {

    const { setUsuario } = usePacienteContext();
    // =============================================
    useEffect(() => {
        //Redireciona para tela de login
        (async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 1000));
            //router.replace('/login')
            //Paciente
            setUsuario(new Paciente('2', 'Carlos Paciente', 2, 10, 0.1, '1', '2024-03-07', 1, 4, 2, 2, 3, 10.5, 5.5, true, 2, false, [], ['sf1']))
            router.replace('/pacientes/perfil')
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
