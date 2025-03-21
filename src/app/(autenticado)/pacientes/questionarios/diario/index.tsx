import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuestionariosService } from '../../../../../services/questionarios.service';
import { usePacienteContext } from '../../../../../contexts/paciente-context';
import { router } from 'expo-router';
import { FormularioQuestionarioDiario } from './components';
import { Questionario } from '../../../../../models/questionario';
import { usePacientesService } from '../../../../../services/pacientes.service';
import { Paciente } from '../../../../../models/paciente';
import { ScrollView } from 'react-native-gesture-handler';
import Dicas from './components/dicas';
import { useConquistasService } from '../../../../../services/conquistas.service';

export interface QuestionarioDiarioScreenProps {
}

export default function QuestionarioDiarioScreen (props: QuestionarioDiarioScreenProps) {
    const [ dias, setDias ] = React.useState<string[]>([]);
    const [ diaAtual, setDiaAtual ] = React.useState(0); 
    const scrollRef = React.useRef<ScrollView>(null);
    const questionarioSrv = useQuestionariosService();
    const pacientesSrv = usePacientesService();
    const { usuario, setUsuario } = usePacienteContext();
    const conquistasSrv = useConquistasService();
    // ===============================================================
    const buscarQuestionarios = async () => {
      const dias = questionarioSrv.buscarQuestionariosAbertos(usuario);

      //Está tudo em dia
      if (dias.length == 0)  router.replace('/pacientes/perfil');
      else {
        setDias(dias);
      }
    }
    // --------
    const responderDia = async (questionario: Questionario) => {
        console.log(questionario);
        const novosDados = {...usuario} as Paciente;

        const cigarrosEvitados = Math.max(0, novosDados.mediaCigarros - questionario.cigarros);
        const economizado = cigarrosEvitados * novosDados.precoCigarro;

        //Adiciona as informações ao perfil do usuário
        if (questionario.fumou)
          novosDados.diasSeguidosSemFumar = 0;
        else {
          novosDados.diasSeguidosSemFumar++;
          novosDados.diasSemFumar++
        }
        
        novosDados.cigarrosEvitados += cigarrosEvitados;
        novosDados.dinheiroAcumulado += economizado;
        novosDados.dinheiroDisponivel += economizado;
        novosDados.ultimoDiaRespondido = questionario.dia;
        //Adiciona questionário
        novosDados.questionariosDiarios.push(questionario);
        setUsuario(novosDados)
        setDiaAtual(diaAtual+1);
        scrollRef.current?.scrollTo({y: 0, x: 0, animated: true});

        conquistasSrv.atualizarConquistas(novosDados);
        console.log(novosDados);
        //Após responder tudo, salva as modificações
        if ((diaAtual + 1) >= dias.length) {
          await pacientesSrv.atualizar(novosDados);
        }  

    }
    // --------
    React.useEffect(() => {
      buscarQuestionarios();
    }, [])
    // ===============================================================
    return (
      <View style={styles.container}>
          { dias.length == 0 && <Text style={styles.h1}>Buscando seus dados</Text>}
          { dias.length > 0 && <ScrollView ref={scrollRef}>
                
                { diaAtual < dias.length && <FormularioQuestionarioDiario dia={dias[diaAtual]} doAvancar={responderDia} /> }
                { diaAtual >= dias.length && <Dicas /> }

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
