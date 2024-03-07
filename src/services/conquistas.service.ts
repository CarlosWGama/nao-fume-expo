import { Conquista, buscarImagem } from "../models/conquista";
import { Paciente } from "../models/paciente";

/**
 * Controla o acesso a API
 */
const ConquistasService = {

    /* BUSCA OS CONQUISTAS  */
    buscarConquistasExistentes: () => {
        const conquistas: Conquista[] = [
        //Total de Dias sem fumar
        new Conquista('sf1', '1 dia sem fumar', 'Parabéns! Você conseguiu ficar seu primeiro dia sem fumar', buscarImagem('no-smoking.png')),
        new Conquista('sf2', '10 dia sem fumar', 'Você alcançou 10 dias sem fumar', buscarImagem('no-smoking.png')),
        new Conquista('sf3', '15 dia sem fumar', 'Você alcançou 15 dias sem fumar', buscarImagem('no-smoking.png')),
        new Conquista('sf4', '30 dia sem fumar', 'Você alcançou 30 dias sem fumar', buscarImagem('no-smoking.png')),
        new Conquista('sf5', '50 dia sem fumar', 'Você alcançou 50 dias sem fumar', buscarImagem('no-smoking.png')),
        new Conquista('sf6', '100 dia sem fumar', 'Você alcançou 100 dias sem fumar', buscarImagem('no-smoking.png')),
        
        //Dias seguidos sem fumar   
        new Conquista('ssf1', '3 dias seguidos', 'Você conseguiu ficar 3 dias seguidos sem fumar!', buscarImagem('no-smoking.png')),
        new Conquista('ssf2', '5 dias sem fumar', 'Uau! Você alcançou 5 dias seguidos sem fumar', buscarImagem('no-smoking.png')),
        new Conquista('ssf3', 'uma semana sem fumar', 'Você conseguiu ficar uma semana sem fumar!', buscarImagem('no-smoking.png')),
        new Conquista('ssf4', 'duas semanas sem fumar', 'Sua segunda semana sem fumar!', buscarImagem('no-smoking.png')),
        new Conquista('ssf5', 'Completou um mês!', 'Você conseguiu ficar uma semana sem fumar!', buscarImagem('no-smoking.png')),
        new Conquista('ssf6', '2 meses sem fumar!', 'Parabéns já são 2 meses sem fumar!', buscarImagem('no-smoking.png')),
        new Conquista('ssf7', '3 meses sem fumar!!', 'Chegou a 3 meses sem fumar', buscarImagem('no-smoking.png')),
        new Conquista('ssf8', '6 meses sem fumar!!', 'Conseguiu completar 6 meses sem fumar!', buscarImagem('no-smoking.png')),
        
        //Exercicio
        new Conquista('exe1', 'Exercitou', 'Você realizou seu primeiro exercício!',  buscarImagem('exercise.png')),
        new Conquista('exe2', '5 dias', 'Você completou 5 dias de exercício, continue assim',  buscarImagem('exercise.png')),
        new Conquista('exe3', '15 dias de exercício', '15 dias práticando!!',  buscarImagem('exercise.png')),
        new Conquista('exe4', '30 dias', 'Mantenha seu ritmo!',  buscarImagem('exercise.png')),
        new Conquista('exe5', '60 dias', 'Você alcançou uma ótima marca',  buscarImagem('exercise.png')),
        new Conquista('exe6', '90 dias', 'Parabéns! Mas não pare por aqui!',  buscarImagem('exercise.png')),
        
        //Financeiro
        new Conquista('fin1', 'Economizando', 'Você começou a economizar seus primeiros reias',  buscarImagem('money.png')),
        new Conquista('fin2', '50 reais!', 'Você já conseguiu juntar 50 reais!',  buscarImagem('money.png')),
        new Conquista('fin3', '100 reais!', 'Seus primeiros 100 reais!',  buscarImagem('money.png')),
        new Conquista('fin4', '250 reais!', 'Sabe aquele presente que você queria? Voce já pode se dar',  buscarImagem('money.png')),
        new Conquista('fin5', '500 reais!', 'Já é possível realizar uma pequena viagem!',  buscarImagem('money.png')),
        new Conquista('fin6', '1000 reais!', 'Nossa R$ 1000, você já pode fazer muita coisa',  buscarImagem('money.png')),
      ];
      return conquistas;
    },

    /**
     * Verifica se não possui a conquista, caso não possua, adiciona
     * @param paciente 
     * @param chave 
     */
    adicionarConquista: (chave: string, conquistas: string[] = []) => {
        if (!conquistas.includes(chave))
            conquistas.push(chave);
        return conquistas;
    },
     /**
     * Libera as conquistas de sias sem fumar (mesmo não seguidos)
     * @param paciente 
     */
    conquistaDiasSemFumar: (paciente: Paciente) => {
        
        if (paciente.diasSemFumar >= 1) paciente.conquistasAlcancadas.push('sf1');
        if (paciente.diasSemFumar >= 10) paciente.conquistasAlcancadas.push('sf2');
        if (paciente.diasSemFumar >= 15) paciente.conquistasAlcancadas.push('sf3');
        if (paciente.diasSemFumar >= 30) paciente.conquistasAlcancadas.push('sf4');
        if (paciente.diasSemFumar >= 50) paciente.conquistasAlcancadas.push('sf5');
        if (paciente.diasSemFumar >= 100) paciente.conquistasAlcancadas.push('sf6');
        paciente.conquistasAlcancadas = [...new Set(paciente.conquistasAlcancadas)];
    },

    /**
    * Libera Conquistas de Dias Seguidos Sem Fumar
    * @param paciente 
    */
    conquistaDiasSeguidosSemFumar: (paciente: Paciente) => {
        
        if (paciente.diasSeguidosSemFumar >= 3) paciente.conquistasAlcancadas.push('ssf1');
        if (paciente.diasSeguidosSemFumar >= 5) paciente.conquistasAlcancadas.push('ssf2');
        if (paciente.diasSeguidosSemFumar >= 7) paciente.conquistasAlcancadas.push('ssf3');
        if (paciente.diasSeguidosSemFumar >= 14) paciente.conquistasAlcancadas.push('ssf4');
        if (paciente.diasSeguidosSemFumar >= 30) paciente.conquistasAlcancadas.push('ssf5');
        if (paciente.diasSeguidosSemFumar >= 60) paciente.conquistasAlcancadas.push('ssf6');
        if (paciente.diasSeguidosSemFumar >= 90) paciente.conquistasAlcancadas.push('ssf7');
        if (paciente.diasSeguidosSemFumar >= 183) paciente.conquistasAlcancadas.push('ssf8');
        paciente.conquistasAlcancadas = [...new Set(paciente.conquistasAlcancadas)];
    },

    /**
    * Libera Conquistas de Dias Seguidos Sem Fumar
    * @param paciente 
    */
    conquistaExercicio: (paciente: Paciente) => {
        
        if (paciente.diasPraticoExercicio >= 1) paciente.conquistasAlcancadas.push('exe1');
        if (paciente.diasPraticoExercicio >= 5) paciente.conquistasAlcancadas.push('exe2');
        if (paciente.diasPraticoExercicio >= 15) paciente.conquistasAlcancadas.push('exe3');
        if (paciente.diasPraticoExercicio >= 30) paciente.conquistasAlcancadas.push('exe4');
        if (paciente.diasPraticoExercicio >= 60) paciente.conquistasAlcancadas.push('exe5');
        if (paciente.diasPraticoExercicio >= 90) paciente.conquistasAlcancadas.push('exe6');
        paciente.conquistasAlcancadas = [...new Set(paciente.conquistasAlcancadas)];
    },

    /**
     * Libera Conquistas Financeiras
     * @param paciente 
     */
    conquistaFinanceira: (paciente: Paciente) => {
        
        if (paciente.dinheiroAcumulado >= 1) paciente.conquistasAlcancadas.push('fin1');
        if (paciente.dinheiroAcumulado >= 50) paciente.conquistasAlcancadas.push('fin2');
        if (paciente.dinheiroAcumulado >= 100) paciente.conquistasAlcancadas.push('fin3');
        if (paciente.dinheiroAcumulado >= 250) paciente.conquistasAlcancadas.push('fin4');
        if (paciente.dinheiroAcumulado >= 500) paciente.conquistasAlcancadas.push('fin5');
        if (paciente.dinheiroAcumulado >= 1000) paciente.conquistasAlcancadas.push('fin6');
        paciente.conquistasAlcancadas = [...new Set(paciente.conquistasAlcancadas)];
    }
}

export const useConquistasService = () => ConquistasService;