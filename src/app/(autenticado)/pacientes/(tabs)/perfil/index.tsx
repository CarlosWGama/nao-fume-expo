import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';
import { AppColors } from '../../../../../templates/colors';
import { AppButton, AppLabel } from '../../../../../templates/components';
import { usePacienteContext } from '../../../../../contexts/paciente-context';
import { router } from 'expo-router';
import { avatarURL } from '../../../../../models/paciente';
import { useSessoesService } from '../../../../../services/sessoes.service';
import { ScrollView } from 'react-native-gesture-handler';
import { DadosPacientesSessao, Sessao } from '../../../../../models/sessao';
import { dataFormat } from '../../../../../helpers/general';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

export interface PerfilScreenProps {
}

export default function PerfilScreen (props: PerfilScreenProps) {
  const { usuario } = usePacienteContext();
  const [ sessoes, setSessoes ] = React.useState<Sessao[]>([]);
  const sessoesSrv = useSessoesService();
  // ==================================================================
  const buscarSessoes = async () => {
    const sessoes = await sessoesSrv.buscarSessoes(usuario?.coordenadorUID);
    
    //Verifica se tem sessão que ainda precisa ser respondida
    let responderQuestionario = false
    sessoes.forEach((sessao:Sessao, index) => {

      const pacienteIndex = sessao.dadosPacientes.map(p => p.pacienteUID).indexOf(usuario.uid);
      //Achou paciente
      if (pacienteIndex >= 0 && sessao.data <= moment().format('YYYY-MM-DD') && !sessao.dadosPacientes[pacienteIndex].opiniao) {
          responderQuestionario = true; 
      }
    })

    if (responderQuestionario)
      router.replace('/pacientes/questionarios/sessao')     
    
    setSessoes(sessoes);
  }
  // -------
  React.useEffect(() => {
    buscarSessoes();
  }, [])
  // ===================================================================
  return (
      <PacienteTemplate title="Perfil" color={AppColors.warning}>
          <ImageBackground source={require('./../../../../../assets/imgs/bg-paciente-perfil.jpg')} style={styles.container}>
            <ScrollView>

              {/* === HEADER === */}
              <View style={{width:320, alignSelf: 'center'}}>
                <AppButton title="Editar" onPress={() => router.push('/pacientes/perfil/editar')} transparent color="white"/>

                {/*  CARD */}
                <View style={styles.card}>
                    <Text style={styles.h1}>{usuario?.nome}</Text>
                    <Image source={avatarURL(usuario?.avatar)} style={styles.avatar} />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                      
                      <View>
                        <Text style={styles.h1}>{usuario?.diasSeguidosSemFumar}</Text>
                        <Text style={{textAlign: 'center'}}>Dias seguidos {"\n"}sem fumar</Text>
                      </View>
                    </View>
                </View>
              </View>

              {/* === SESSOES === */}
              <Text style={styles.sessoes}>Sessões</Text>
              <View style={styles.card}>
                {sessoes.map((s, index) => (
                  <View key={""+index} style={styles.item}>
                    <Text>Sessão {index+1} </Text>

                    {s.data <= moment().format('YYYY-MM-DD')  && <AppLabel text='Realizado' color='grey' />}
                    {s.data > moment().format('YYYY-MM-DD') && <AppLabel text='Comparecer' />}

                    <Text>{dataFormat(s.data)}</Text>
                  </View>
                ))}
              </View>

              {/* === Informações === */}
              <Text style={styles.sessoes}>Informações</Text>
              <View style={[styles.card, {flexDirection: 'row', justifyContent: 'space-around'}]}>
                  {/* DIAS */}
                  <View style={{alignItems:'center'}}>
                      <Text style={styles.textInfo}>Total dias {"\n"} sem fumar</Text>
                      <Ionicons name='calendar' size={30} />
                      <Text style={styles.h1}>{usuario?.diasSemFumar}</Text>
                  </View>
                  {/* DINHEIRO */}
                  <View style={{alignItems:'center'}}>
                      <Text style={styles.textInfo}>Dinheiro {"\n"} economizado</Text>
                      <Ionicons name='cash' size={30} color="green"/>
                      <Text style={styles.h1}>R${usuario?.dinheiroAcumulado.toFixed(2)}</Text>
                  </View>
                  {/* CIGARROS */}
                  <View style={{alignItems:'center'}}>
                      <Text style={styles.textInfo}>Cigarros {"\n"} evitados</Text>
                      <Ionicons name='logo-no-smoking' size={30} color="red"/>
                      <Text style={styles.h1}>{usuario?.cigarrosEvitados}</Text>
                  </View>

              </View>
              

            </ScrollView>
          </ImageBackground>
      </PacienteTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    alignItems: 'center',
    elevation: 1,
    marginVertical: 10,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 20
  },

  h1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },

  sessoes: {
    fontSize: 25,
    textAlign:'center',
    color: 'grey'
  },

  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    padding: 10
  },

  textInfo: {
    fontSize: 12,
    textAlign: 'center'
  }

});
