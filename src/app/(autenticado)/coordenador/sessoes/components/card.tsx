import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sessao, getTotalPresentes } from '../../../../../models/sessao';
import { LinearGradient } from 'expo-linear-gradient';
import { dataFormat } from '../../../../../helpers/general';
import { CardButton } from '.';

export interface CardSessaoProps {
    sessao: Sessao;
    posicao: number;
}
// =====
function CardSessao ({sessao, posicao}: CardSessaoProps) {

    const handleEditar = async () => {

    }
    // =====
    const handleExcluir = async () => {

    }

    // ========================================================
    return (
      <LinearGradient colors={['#3d4e82', '#6d7ef2']} start={{x: 0, y: 1}} end={{x: 1, y: 0}} style={styles.container}>

        {/* DADOS  */}
        <TouchableOpacity>
          <View style={styles.row}>
              {/* Numero da sessão */}
              <View style={styles.item}>
                <Text style={styles.text}>Sessão</Text>
                <Text style={[styles.text, {fontSize: 18}]}>{posicao}</Text>
              </View>
              {/* Numero de pacientes */}
              <View style={styles.item}>
                <Text style={styles.text}>Pacientes</Text>
                <Text style={[styles.text, {fontSize: 18, fontWeight: 'bold'}]}>{getTotalPresentes(sessao.dadosPacientes)}/{sessao.dadosPacientes.length}</Text>
              </View>
              {/* Data da sessão */}
              <View style={styles.item}>
                <Text style={styles.text}>{dataFormat(sessao.data, 'database-to-br')}</Text>
              </View>
          </View>
        </TouchableOpacity>

        {/* BOTÕES */}
        <View style={styles.row}>
            <CardButton title='Editar' icon='newspaper-outline' onPress={handleEditar}/>
            <CardButton  title='Excluir' icon='trash-outline'  onPress={handleExcluir}/>
        </View>
      </LinearGradient>
    );
}
// =====
const styles = StyleSheet.create({
    container: {
      margin: 5, 
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    row: {
      flex: 1,
      flexDirection: 'row'
    },
    item: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: 'white'
    }

});
// =====
export default React.memo(CardSessao);