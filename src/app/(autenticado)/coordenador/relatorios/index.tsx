import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';
import { useEffect, useState } from 'react';
import { AppHeaderRelatorio, AppRankPacientes } from './components';
import { Paciente } from '../../../../models/paciente';
import { Sessao, SituacaoSessao } from '../../../../models/sessao';
import { BarChart, LineChart, StackedBarChart } from 'react-native-chart-kit';
import { useSessoesService } from '../../../../services/sessoes.service';
import { usePacientesService } from '../../../../services/pacientes.service';
import { Dimensions } from "react-native";
import { AppColors } from '../../../../templates/colors';
import { auth } from '../../../../config/firebase';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { AppButton } from '../../../../templates/components';
import { dataFormat } from '../../../../helpers/general';
import moment from 'moment';

export interface RelatoriosProps {
}

export default function Relatorios (props: RelatoriosProps) {
    const sessoesService = useSessoesService();
    const pacientesService = usePacientesService();
    const [ pacientes, setPacientes ] = useState<Paciente[]>([]);
    const [ sessoes, setSessoes ] = useState<Sessao[]>([]);
    const [ isGerando, setGerando ] = useState<boolean>(false);
    const [ info, setInfo ] = useState<{data: string, total: number, naoFumou: number, fumou: number, manutencao: number}[]>([]);
    const chartConfig = {
      backgroundGradientFrom: 'white',
      backgroundGradientTo: 'white',
      fillShadowGradient: AppColors.primary,
      fillShadowGradientOpacity:1,
      color: (opacity = 1) => AppColors.primary,
    }
    // ==========================================================================
    const buscarPacientes = async () => {
      let pacientes = await pacientesService.buscarPacientes();
      pacientes.sort((p1, p2) => (p1.diasSemFumar > p2.diasSemFumar ? -1 : 1))
      setPacientes(pacientes);
    }
    // ----------
    const carregarGrafico = async () => {
      //Buscar sessões
      const sessoes: Sessao[] = await sessoesService.buscarSessoes(auth.currentUser?.uid);
      setSessoes(sessoes);

      const newInfo: any = [];
      sessoes.forEach(s => {
      
        let total = 0;
        let naoFumou = 0;
        let fumou = 0;
        let manutencao = 0;
        let {data} = s;
        s.dadosPacientes.forEach(paciente => {
          if (paciente.presente) total++;
          if (paciente.situacao == SituacaoSessao.ABSTINENTE) naoFumou++;
          if (paciente.situacao == SituacaoSessao.FUMANDO) fumou++;
          if (paciente.situacao == SituacaoSessao.MANUTENCAO) manutencao++;
        })
  
        newInfo.push({data, total, naoFumou, fumou, manutencao})
      })

      setInfo(newInfo);
    }
    // ---------------
    const gerarRelatorioXLS = async () => {
        setGerando(true);
        const sessoes: Sessao[] = await sessoesService.buscarSessoes(auth.currentUser?.uid);

        let wb = XLSX.utils.book_new();
        //Dados da tabela
        const dados = [
          ['Nome', 'Gênero', ...sessoes.map((sessao, index) => `Sessão ${index+1} - ${dataFormat(sessao.data)}`)]
        ]

        pacientes.sort((p1, p2) => p1.nome > p2.nome ? 1 : -1).forEach(p => {
          let info = [p.nome, p.genero];
      
          info = info.concat(sessoes.map(sessao => {
            //Sessão ainda não ocorreu
            if (sessao.dadosPacientes.length == 0 || sessao.data > moment().format('YYYY-MM-DD')) return '0';
            
            //Paciente não encontrado
            const dados = sessao.dadosPacientes.find(dados => dados.pacienteUID == p.uid);
            if (!dados?.presente) return 'FALTOU';
            if (!dados) return '0';

            //Encontrou o paciente na sessão
            return dados.situacao?.valueOf().toString();
          }));

          dados.push(info)
        })


        let ws = XLSX.utils.aoa_to_sheet(dados);
    

        //Gera o relatório
        XLSX.utils.book_append_sheet(wb, ws, "relatorio", true);
    
        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + "relatorio.xlsx";
        FileSystem.writeAsStringAsync(filename, base64, {
          encoding: FileSystem.EncodingType.Base64
        }).then(() => {
          Sharing.shareAsync(filename);
        });
        setGerando(false);

      };
    // ----------------
    useEffect(() => {
      buscarPacientes();
      carregarGrafico();
    }, [])
    // =========================================================
    return (
      <CoordenadorTemplate title='Relatórios'>
        <ScrollView>
          <AppHeaderRelatorio pacientes={pacientes} />
          <AppRankPacientes pacientes={pacientes}/>
          <Text style={styles.sessoes}>Sessões</Text>
          
          {/* AÇÔES */}
          <AppButton title='Gerando Relatório' onPress={gerarRelatorioXLS} loading={isGerando}/>

          {/* PRESENÇA  */}
          <View style={styles.chart}>
            <Text style={{fontSize: 18, color: AppColors.primary}}>Presença</Text>
            {info.length > 0 && <BarChart
              width={Dimensions.get("window").width - 30} 
              height={200}
              chartConfig={chartConfig}
              showValuesOnTopOfBars={true}
              withHorizontalLabels ={false}
              data={{
                labels: info.map((s, index) => ""+(index+1)),
                datasets: [
                  {
                    data: info.map(s => s.total),
                    withDots: false,
                  }
                ]}}
            />}
          </View>


          {/* PRESENÇA  */}
          <View style={styles.chart}>
            <Text style={{fontSize: 18, color: AppColors.primary}}>Situação dos pacientes</Text>
            {info.length > 0 && <StackedBarChart
                  data={{
                    labels: info.map((s, index) => ""+(index+1)),
                    legend: ["Abstinente", "Fumando", "Manutenção"],
                    data: info.map(s => [s.naoFumou, s.fumou, s.manutencao]),
                    barColors: [AppColors.success, AppColors.danger, AppColors.warning]
                  }}
                  width={Dimensions.get("window").width - 30} 
                  height={220}
                  withHorizontalLabels ={false}
                  chartConfig={chartConfig}
                />}

        </View>


        </ScrollView>
      </CoordenadorTemplate>
    );
}

const styles = StyleSheet.create({
  sessoes: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'grey',
    marginVertical: 10
  },
  chart: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center'
  }
});