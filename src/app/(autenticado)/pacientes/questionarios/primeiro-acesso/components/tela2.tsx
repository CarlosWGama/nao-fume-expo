import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AppButton } from '../../../../../../templates/components';
import ItemPrimeiroAcesso from './item';
import * as Speech from 'expo-speech';

export interface PrimeiroAcessoTela1Props {
  onAvancar(pergunta: {pergunta: string, selecionado: number}[]): any;
}

function PrimeiroAcessoTela2 ({onAvancar}: PrimeiroAcessoTela1Props) {

    const [ perguntas, setPerguntas ] = React.useState<{pergunta: string, selecionado: number}[]>([
      {pergunta:'É muito difícil para você ficar 12 horas sem fumar?', selecionado:0},
      {pergunta:'Você tem um desejo intensivo e compulsivo ("fissura") por cigarro?', selecionado:0},
      {pergunta:'Você sente necessidade de fumar pelo menos um certo número de cigarros por dia?', selecionado:0},
      {pergunta:'Você frequentemente se encontra fumando sem ter percebido que havia acendido um cigarro?', selecionado:0},
      {pergunta:'Você associa o ato de fumar com outros comportamentos tais como tomar café ou falar ao telefone?', selecionado:0},
      {pergunta:'Você já passou, por acaso, um dia inteiro sem fumar?', selecionado:0},
      {pergunta:'Você fuma mais depois de ter uma discussão com alguém?', selecionado:0},
      {pergunta:'Fumar é um dos prazeres mais importantes da sua vida?', selecionado:0},
      {pergunta:'O pensamento de nunca mais fumar o torna infeliz?', selecionado:0}
    ])
    const [ isValid, setIsValid ] = React.useState(false);
    // ========================================================================
    const handleSelect = (index, valor) => {
      const novaResposta = [...perguntas];
      novaResposta[index].selecionado = valor;
      setPerguntas(novaResposta)
      setIsValid(novaResposta.map(r => r.selecionado).includes(0))
    }
    // -----------
    React.useEffect(() => {
      const msg = 'Responda o questionário abaixo. Para saber o que cada pergunta fala, clique no texto.';
      Speech.speak(msg, { language: 'pt' });
    }, [])
    // -----------
    React.useEffect(() => () => {
      Speech.stop();
    }, [])
    // ========================================================================
    return (
      <View style={styles.container}>
          <Text style={styles.h1}>Questionário</Text>
          { perguntas.map((pergunta, index) => (
            <ItemPrimeiroAcesso key={""+index} pergunta={pergunta} posicao={index+1} onSelect={(valor) => handleSelect(index, valor)} />
          ))}
          <AppButton title='Analisar' onPress={() => onAvancar(perguntas)} disabled={isValid}/>
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
    marginVertical: 20
  }
});

export default React.memo(PrimeiroAcessoTela2)