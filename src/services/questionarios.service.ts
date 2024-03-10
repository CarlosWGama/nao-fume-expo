import moment from "moment";
import { Paciente } from "../models/paciente";
import { Questionario } from "../models/questionario";
import { useConquistasService } from "./conquistas.service";
import { usePacientesService } from "./pacientes.service";

const conquistaService = useConquistasService();
/**
 * Controla o acesso a API
 */
const QuestionariosService = {

    
  /**
   * Coleta os dados das respostas do paciente
   * @param questionario Questionario
   */
  responder: (paciente: Paciente, questionario: Questionario) => {
    
    //Atualiza os dados do paciente
    let cigarrosEvitados = Math.max(0, paciente.mediaCigarros - questionario.cigarros);
    let economizado = cigarrosEvitados * paciente.precoCigarro;

    if (questionario.exercitou) paciente.diasPraticoExercicio++;
    if (!questionario.fumou) {
      paciente.diasSeguidosSemFumar++
      paciente.diasSemFumar++
      paciente.maxDiasSemFumar = Math.max(paciente.diasSeguidosSemFumar, paciente.maxDiasSemFumar);
    } else {
      paciente.diasSeguidosSemFumar = 0;
    }
    paciente.questionariosDiarios.push(questionario);
    paciente.cigarrosEvitados += cigarrosEvitados; //Atualiza totoal de cigarros
    paciente.dinheiroAcumulado += economizado;     //Atualiza dinheiro acumlado e disponivel
    paciente.dinheiroDisponivel += economizado;
    paciente.ultimoDiaRespondido = moment(questionario.dia).add(1, 'days').format('YYYY-MM-DD');//Atualiza a data do ultimo questionário respondido
    
    conquistaService.atualizarConquistas(paciente);
    const pacienteSrv = usePacientesService();
    pacienteSrv.atualizar(paciente);
  },

  /**
   * Checa se tem questionário para responder 
   */ 
  buscarQuestionariosAbertos: (paciente: Paciente) => {
      let ultimoDiaRespondido =  paciente.ultimoDiaRespondido;
      let diasResponder:string[] = [];
      let diaAtual = moment().format('YYYY-MM-DD');
      //Recupera os dias não respondidos
      while (ultimoDiaRespondido < diaAtual) {
        diasResponder.push(ultimoDiaRespondido); //Adiciona no inicio do vetor
        ultimoDiaRespondido = moment(ultimoDiaRespondido).add(1, 'days').format('YYYY-MM-DD');
      }
      return diasResponder;
  }
}

export const useQuestionariosService = () => QuestionariosService;