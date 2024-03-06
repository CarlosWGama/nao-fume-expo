import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { AppConfig } from '../config/app';
import { AppColors } from '../templates/colors';

export default function Initial (props) {

    // =============================================
    useEffect(() => {
        //Redireciona para tela de login
        (async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 1000));
            //router.replace('/login')
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
