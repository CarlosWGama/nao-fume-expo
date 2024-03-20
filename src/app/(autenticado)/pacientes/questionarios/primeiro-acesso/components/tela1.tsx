import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AppButton } from '../../../../../../templates/components';
import * as Speech from 'expo-speech';

export interface PrimeiroAcessoTela1Props {
  onAvancar(): any;
}

function PrimeiroAcessoTela1 ({onAvancar}: PrimeiroAcessoTela1Props) {

    // ================================================
    React.useEffect(() => {
      const msg = 'Esse é seu primeiro acesso. Responda algumas perguntas para que eu possa ajudá-lo a entender o seu grau de dependência. Para iniciar, clique no botão abaixo';
      Speech.speak(msg, { language: 'pt' });
    }, [])
    // --------
    React.useEffect(() => () => {
      Speech.stop();
    }, [])
    // ================================================
    return (
      <View style={styles.container}>
         <Text style={styles.h1}>Bem vindo!</Text>
         <Image source={require('./../../../../../../assets/imgs/ajudante.png')} style={{height: 365, width: 111}} />

         <Text style={styles.description}>Esse é seu primeiro acesso. Responda algumas perguntas para que eu possa ajudá-lo a entender o seu grau de dependência.</Text>
         
         <Text style={styles.description}>Para iniciar, clique no botão abaixo</Text>

         <AppButton title='Iniciar' onPress={onAvancar} />
      </View>
    );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10
  },
  container: {
    flex: 1,
    alignItems: 'center'  
  },
  description: {
    textAlign: 'justify',
    marginVertical: 20
  }
});

export default React.memo(PrimeiroAcessoTela1)