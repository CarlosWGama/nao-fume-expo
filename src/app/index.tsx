import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function Initial (props) {

    // =============================================
    useEffect(() => {
        //Redireciona para tela de login
        (async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 1000));
            router.replace('/login')
        })()
    }, []);

    // ==============================================
    return (
      <View>
         <Text>Initial</Text>
      </View>
    );
}
