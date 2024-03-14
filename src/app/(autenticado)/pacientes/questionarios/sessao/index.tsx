import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePacienteContext } from '../../../../../contexts/paciente-context';
import { router } from 'expo-router';
import { FormularioSessoes } from './components';
import { ScrollView } from 'react-native-gesture-handler';
import { Sessao } from '../../../../../models/sessao';
import { useSessoesService } from '../../../../../services/sessoes.service';

export interface QuestionarioDiarioScreenProps {
}

export default function QuestionarioDiarioScreen (props: QuestionarioDiarioScreenProps) {
    const [ sessoes, setSessoes ] = React.useState<Sessao[]>([]);
    const [ sessaoAtual, setSessaoAtual ] = React.useState(0); 
    const scrollRef = React.useRef<ScrollView>(null);
    const sessoesSrv = useSessoesService();
    const { usuario, setUsuario } = usePacienteContext();

    // ===============================================================
    const buscarSessoes = async () => {
      const sessoes = await sessoesSrv.buscarSessoesAbertas(usuario);
      console.log(sessoes);
      //Está tudo em dia
      if (sessoes.length == 0)  router.replace('/pacientes/perfil');
      else {
        setSessoes(sessoes);
      }
    }
    // --------
    const responderDia = async (sessao: Sessao) => {
        console.log('==========================================================')
        console.log(sessao);
        console.log('==========================================================')
        
        scrollRef.current?.scrollTo({y: 0, x: 0, animated: true});

        await sessoesSrv.atualizar(sessao);
        if ((sessaoAtual+1) >= sessoes.length) {
          router.replace('/pacientes/perfil')
        }
        setSessaoAtual(sessaoAtual+1);
    }
    // --------
    React.useEffect(() => {
      buscarSessoes();
    }, [])
    // ===============================================================
    return (
      <View style={styles.container}>
          { sessoes.length == 0 && <Text style={styles.h1}>Buscando seus dados</Text>}
          { sessoes.length > 0 && <ScrollView ref={scrollRef}>
                
                { sessaoAtual < sessoes.length && <FormularioSessoes sessao={sessoes[sessaoAtual]} doAvancar={responderDia} /> }

            </ScrollView>}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  }
});
