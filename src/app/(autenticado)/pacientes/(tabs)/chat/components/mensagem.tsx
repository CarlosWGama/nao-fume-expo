import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Mensagem } from '../../../../../../models/mensagem';
import { dataFormat } from '../../../../../../helpers/general';

export interface MensagemProps {
    mensagem: Mensagem;
    autor: boolean
}

function ItemMensagem ({mensagem, autor}: MensagemProps) {
    
    return (
        <View style={{width: '80%', alignSelf: (autor ? 'flex-start' : 'flex-end')}}>
            <View style={styles.container}>
                <View style={{flexDirection: (autor ? 'row' : 'row-reverse'), justifyContent: 'space-between'}}>
                    <Text style={styles.autor}>Usuário {mensagem.pacienteCodigo}</Text>
                    <Text style={styles.data}>{dataFormat(mensagem.data)}</Text>
                </View>
                <Text  style={[styles.msg, { textAlign: (autor ? 'left' : 'right')}]}>{mensagem.mensagem}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 5
    }, 
    autor: {
        fontWeight: 'bold',
        fontSize: 18
    },
    data: {
        color: 'grey'
    }, 
    msg: {
        padding: 5
    }
});

export default React.memo(ItemMensagem)
