import { View, Text, FlatList } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';
import { CardSessao } from './components';
import { useEffect, useState } from 'react';
import { DadosPacientesSessao, Sessao, SituacaoSessao } from '../../../../models/sessao';
import { AppFabButton } from '../../../../templates/components';
import { AppColors } from '../../../../templates/colors';
import { useCoordenadorContext } from '../../../../contexts/coordenador-context';
import { router } from 'expo-router';
import Toast from 'react-native-root-toast';

export interface SessoesProps {
}

export default function Sessoes (props: SessoesProps) {
    const [ sessoes, setSessoes ] = useState<Sessao[]>([])
    const { setSessao } = useCoordenadorContext();
    // =========================================================
    const buscarSessoes = async () => {
      setSessoes([
        new Sessao('1', '2024-02-01', '123123', true, [new DadosPacientesSessao('12312', true, 'Carlos Alberto Correia Lessa Filho aaaa aaaaa aaa', SituacaoSessao.ABSTINENTE, 'aaaaa'), new DadosPacientesSessao('12312', false, 'Carlos', SituacaoSessao.ABSTINENTE, 'aaaaa')], false),
        new Sessao('2', '2024-03-02', '123123', true, [new DadosPacientesSessao('12312', false, 'Maria', SituacaoSessao.FUMANDO)], false),
      ])
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
      Toast.show('Tarefa excluida com sucesso!')
    }
    // ========
    const handleAbrir = async (sessao: Sessao) => {
      setSessao(sessao)
      router.push('/coordenador/sessoes/visualizar/geral')
    }
    // ========
    useEffect(() => {
        buscarSessoes();
    }, []);
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
