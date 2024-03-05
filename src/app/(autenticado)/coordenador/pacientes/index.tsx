import { View, Text, FlatList } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';
import { useEffect, useState } from 'react';
import { Paciente } from '../../../../models/paciente';
import { CardPaciente } from './components';
import { AppFabButton } from '../../../../templates/components/fab-button';
import { router } from 'expo-router';
import { useCoordenadorContext } from '../../../../contexts/coordenador-context';
import { usePacientesService } from '../../../../services/pacientes.service';

export interface PacientesProps {
}

export default function Pacientes (props: PacientesProps) {


    const [ pacientes, setPacientes ] = useState<Paciente[]>([]);
    const { setPaciente } = useCoordenadorContext();
    const pacientesServices = usePacientesService();
    // ==========================================================================
    const buscarPacientes = async () => {
      setPacientes(await pacientesServices.buscarPacientes());
    }
    // ========
    const handleNovoPaciente = async () => {
      setPaciente(null);
      router.push('/coordenador/pacientes/editar');
    }
    // =========
    useEffect(() => {
      buscarPacientes();
    }, [])
    // ==========================================================================
    return (
      <CoordenadorTemplate title='Pacientes'>
        <View style={{padding: 5, flex: 1}}>

         <FlatList 
            data={pacientes}
            renderItem={({item, index}) => (<CardPaciente key={""+index}  position={index} paciente={item}/>)}
            
            />

          <AppFabButton onPress={handleNovoPaciente} position='bottom-right' />
        </View>
      </CoordenadorTemplate>
    );
}
