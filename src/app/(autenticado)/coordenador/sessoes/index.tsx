import { View, Text, FlatList } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';
import { CardSessao } from './components';
import { useEffect, useState } from 'react';
import { DadosPacientesSessao, Sessao, SituacaoSessao } from '../../../../models/sessao';
import { AppFabButton } from '../../../../templates/components';
import { AppColors } from '../../../../templates/colors';

export interface SessoesProps {
}

export default function Sessoes (props: SessoesProps) {
    const [ sessoes, setSessoes ] = useState<Sessao[]>([])
    // =========================================================
    const buscarSessoes = async () => {
      setSessoes([
        new Sessao('1', '2024-02-01', '123123', true, [new DadosPacientesSessao('12312', true, 'Carlos', SituacaoSessao.ABSTINENTE, 'aaaaa'), new DadosPacientesSessao('12312', false, 'Carlos', SituacaoSessao.ABSTINENTE, 'aaaaa')], false),
        new Sessao('2', '2024-02-01', '123123', true, [new DadosPacientesSessao('12312', true, 'Carlos', SituacaoSessao.ABSTINENTE, 'aaaaa')], false),
      ])
    }
    // ========
    const handleNovaSessao = async () => {

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
            renderItem={({item, index}) => (<CardSessao sessao={item} posicao={index+1}/>)}
          />
          <AppFabButton onPress={handleNovaSessao} position='bottom-right' color={AppColors.danger} />
        </View>
      </CoordenadorTemplate>
    );
}
