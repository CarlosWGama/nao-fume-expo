import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Paciente } from '../../../../../models/paciente';
import { AppColors } from '../../../../../templates/colors';

export interface AppRankPacientesProps {
  pacientes: Paciente[];
}

function AppRankPacientes ({pacientes}: AppRankPacientesProps) {
    return (
      <View style={styles.container}>
         {pacientes.map((item, index) => (
                <View key={""+index} style={styles.item}>
                  <Text style={styles.posicao}>{index+1}</Text>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text>{item.diasSeguidosSemFumar} dia{(item.diasSeguidosSemFumar != 1 ? 's' : '')}</Text>
                </View>
            ))}
      </View>
    );
}
// =====================
const styles = StyleSheet.create({
  container: {
    padding:5,
    marginTop: -20
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightgrey,
    padding: 5,
    alignItems: 'center',
  },
  posicao: {
    fontSize: 20,
    color: 'grey',
    fontWeight: 'bold',
    marginHorizontal: 10
  }, 
  nome: {
    flex: 1
  }
});
// =====================
export default React.memo(AppRankPacientes)