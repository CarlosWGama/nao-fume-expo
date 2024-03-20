import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

export interface ItemPrimeiroAcessoProps {
    posicao: number,
    pergunta: {pergunta: string, selecionado: number|null}
    onSelect(value: number):void
}

function ItemPrimeiroAcesso ({posicao, pergunta, onSelect}: ItemPrimeiroAcessoProps) {

    const speak = () => {
      Speech.speak(pergunta.pergunta, { language: 'pt' });
    }
    // ===================================================================================
    return (
      <View style={styles.container}>
        {/* PERGUNTA */}
        <View style={{flex: 1, marginRight: 5}}>
            <TouchableOpacity onPress={speak} >

                <Text style={styles.pergunta}>
                    <Text style={{fontWeight: 'bold'}}>{posicao}. </Text>
                    <Text>{pergunta.pergunta}</Text>
                </Text>
            </TouchableOpacity>
        </View>

        {/* OPCOES */}
        <View style={styles.respostas}>
            {/* SIM */}
            <TouchableOpacity onPress={() => onSelect(1)}>
                <View style={[styles.opcao, {backgroundColor: (pergunta.selecionado != 1 ? 'white' : '#ffa07a')}]}>
                    <Image source={require('./../../../../../../assets/imgs/icons/like.png')} style={{height: 50, width: 50}} />    
                    <Text>SIM</Text>
                </View>
            </TouchableOpacity>

            {/* NÃO */}
            <TouchableOpacity onPress={() => onSelect(2)}>
                <View style={[styles.opcao, {backgroundColor: (pergunta.selecionado != 2 ? 'white' : '#ffa07a')}]}>
                    <Image source={require('./../../../../../../assets/imgs/icons/like.png')} style={{height: 50, width: 50, transform: [{scaleX: -1}, {scaleY: -1}]}} />    
                    <Text>NÃO</Text>
                </View>
            </TouchableOpacity>
         </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10
    },
    pergunta: {
        fontSize: 16,
        textAlign:'justify',
    },
    respostas: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    opcao: {
        margin: 5,
        height: 75,
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }

});

export default React.memo(ItemPrimeiroAcesso);
