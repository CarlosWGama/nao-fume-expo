import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AppButton } from '../../../../../../templates/components';

export interface PrimeiroAcessoTela3Props {
  onAvancar(): any;
  resultado:string[];
}

function PrimeiroAcessoTela3 ({onAvancar, resultado}: PrimeiroAcessoTela3Props) {
    
    
    return (
      <View style={styles.container}>
          <Text style={styles.h1}>Resultado!</Text>

          <Image source={require('./../../../../../../assets/imgs/ajudante.png')} style={{height: 365, width: 111, alignSelf: 'center'}} />

          <Text style={styles.description}>Bom, vamos aos seus resultados</Text>
          <Text style={styles.description}>Vejo que o cigarro para você não é uma dependência muito forte. Mas ainda sim, devemos parar para cuidar da sua saúde</Text>
          {resultado.map((fala, index) => (<Text key={""+index}> - {fala}</Text>))}
          <View style={{marginBottom:20}}/>

          <Text style={styles.description}>Caso você não consiga realizar uma parada abrupta, pode optar uma parada gradual.</Text>
          <Text style={styles.description}>A parada gradual consistema em ir diminuindo os cigarros consumidos no dia aos poucos:</Text>
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.description}>- 30 no primeiro dia</Text>
            <Text style={styles.description}>- 25 no segundo dia</Text>
            <Text style={styles.description}>- 20 no terceiro dia</Text>
            <Text style={styles.description}>- 15 no quarto dia</Text>
            <Text style={styles.description}>- até encerrar...</Text>
          </View>
          <View style={{marginBottom:20}}/>

          <Text style={styles.description}>A parada gradual também pode ser baseada no adiamento, demorando mais tempo entre um cigarro e outro, ou a hora em que começa a fumar:</Text>
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.description}>- Começa as 9h no primeiro dia</Text>
            <Text style={styles.description}>- Começa as 11h no segundo dia</Text>
            <Text style={styles.description}>- Começa as 13h no terceiro dia</Text>
            <Text style={styles.description}>- Começa as 15h no quarto dia</Text>
            <Text style={styles.description}>- até encerrar...</Text>
          </View>
          <View style={{marginBottom:20}}/>

          <AppButton title='INICIAR APLICATIVO' onPress={onAvancar}/>
      </View>
    );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'stretch'  
  },
  description: {
    textAlign: 'justify',
  }
});

export default React.memo(PrimeiroAcessoTela3)