import { View, Text, FlatList, Alert } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';
import { CardSessao } from './components';
import { useEffect, useState, useCallback } from 'react';
import { DadosPacientesSessao, Sessao, SituacaoSessao } from '../../../../models/sessao';
import { AppFabButton } from '../../../../templates/components';
import { AppColors } from '../../../../templates/colors';
import { useCoordenadorContext } from '../../../../contexts/coordenador-context';
import { router, useFocusEffect } from 'expo-router';
import Toast from 'react-native-root-toast';
import { useSessoesService } from '../../../../services/sessoes.service';
import auth from '@react-native-firebase/auth';

export interface SessoesProps {
}

export default function Sessoes (props: SessoesProps) {
    const [ sessoes, setSessoes ] = useState<Sessao[]>([])
    const { setSessao } = useCoordenadorContext();
    const sessoesSrv = useSessoesService();
    // =========================================================
    const buscarSessoes = async () => {
      if (auth().currentUser)
        setSessoes(await sessoesSrv.buscarSessoes(auth().currentUser.uid));
    }
    // ========
    const handleNovaSessao = async () => {
      setSessao(null)
      router.push('/coordenador/sessoes/editar');
    }
    // ========
    const handleEditar = async (sessao: Sessao) => {
      setSessao(sessao)
      router.push('/coordenador/sessoes/editar');
    }
    // ========
    const handleExcluir = async (sessao: Sessao) => {
      Alert.alert('Excluir', 'Deseja realmente excluir essa sessão?', [
        {text: 'Cancelar'},
        {text: 'Confirmar', onPress: async () => {
          const retorno = await sessoesSrv.excluir(sessao);
          setSessoes(await sessoesSrv.buscarSessoes(auth().currentUser.uid));
          if (retorno.sucesso)
            Toast.show('Tarefa excluida com sucesso!')
          else
            Toast.show('Não foi possível completar a operação')
        }}
      ])
    }
    // ========
    const handleAbrir = async (sessao: Sessao) => {
      setSessao(sessao)
      router.push('/coordenador/sessoes/visualizar/geral')
    }
    // ========
    useFocusEffect(
      useCallback(() => {
        buscarSessoes()
      }, [])
    );
    // =========================================================
    return (
      <CoordenadorTemplate title='Sessões'>
        <View style={{flex: 1}}>
          <FlatList
            data={sessoes}
            renderItem={({item, index}) => (<CardSessao sessao={item} posicao={index+1} onAbrir={() => handleAbrir(item)} onEditar={() => handleEditar(item)} onExcluir={() => handleExcluir(item)}/>)}
          />
          <AppFabButton onPress={handleNovaSessao} position='bottom-right' color={AppColors.danger} />
        </View>
      </CoordenadorTemplate>
    );
}
