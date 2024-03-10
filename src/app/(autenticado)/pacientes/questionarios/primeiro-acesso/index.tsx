import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrimeiroAcessoTela1, PrimeiroAcessoTela2, PrimeiroAcessoTela3 } from './components';
import { ScrollView } from 'react-native-gesture-handler';
import { usePacientesService } from '../../../../../services/pacientes.service';
import { usePacienteContext } from '../../../../../contexts/paciente-context';
import { Paciente } from '../../../../../models/paciente';
import { router } from 'expo-router';

export interface PrimeiroAcessoScreenProps {
}

export default function PrimeiroAcessoScreen (props: PrimeiroAcessoScreenProps) {
    const [ tela, setTela ] = React.useState(1);
    const [ resultado, setResultado ] = React.useState<string[]>([]);
    const pacientesSrv = usePacientesService();
    const { usuario, setUsuario } = usePacienteContext();
    // ==========================================================================
    const responder = (perguntas) => {
      const resultado: string[] = []
      if (perguntas[0].selecionado || perguntas[1].selecionado || perguntas[2].selecionado)
        resultado.push('Percebo que você está fisicamente dependente do cigarro');
      if (perguntas[3].selecionado || perguntas[4].selecionado || perguntas[5].selecionado)
        resultado.push('Vejo que está fazendo associações de comportamento envolvendo o ato de fumar');
      if (perguntas[6].selecionado || perguntas[7].selecionado || perguntas[8].selecionado)
        resultado.push('Você está psicologicamente dependente do cigarro');
      setResultado(resultado);
      setTela(3);
    }
    // --------
    const finalizar = async () => {
      const paciente = {...usuario} as Paciente;
      paciente.primeiroAcesso = false;
      setUsuario(paciente);
      pacientesSrv.atualizar(paciente);
      router.replace('/pacientes/questionarios/diario')
    }
    // ==========================================================================
    return (
        <LinearGradient colors={['#a1c4fd', '#c2e9fb']} start={[0, 1]} end={[1, 0]} style={styles.container}>
          <ScrollView>
            {tela == 1 && <PrimeiroAcessoTela1 onAvancar={() => setTela(2)}/>}
            {tela == 2 && <PrimeiroAcessoTela2 onAvancar={responder}/>}
            {tela == 3 && <PrimeiroAcessoTela3 onAvancar={finalizar} resultado={resultado}/>}
          </ScrollView>
        </LinearGradient>
    );
}
// =========
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  }
});
