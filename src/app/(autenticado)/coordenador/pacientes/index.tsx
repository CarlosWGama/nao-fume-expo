import { View, Text, FlatList } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';
import { useEffect, useState } from 'react';
import { Paciente } from '../../../../models/paciente';
import { CardPaciente } from './components';
import { AppFabButton } from '../../../../templates/components/fab-button';
import { router } from 'expo-router';

export interface PacientesProps {
}

export default function Pacientes (props: PacientesProps) {


    const [ pacientes, setPacientes ] = useState<Paciente[]>([]);
    // ==========================================================================
    const buscarPacientes = async () => {
      setPacientes([
        new Paciente('12312', 'Carlos Alberto', 1, 10, 0.1, '111', '2024-02-20', 1, 20, 4, 2, 2, 100.00, 150.00, false, 2, false, []),
        new Paciente('12312', 'Maria', 2, 10, 0.1, '111', '2024-02-20', 2, 20, 4, 2, 2, 100.00, 150.00, false, 2, false, []),
        new Paciente('12312', 'Jose', 3, 10, 0.1, '111', '2024-02-20', 3, 20, 4, 2, 2, 100.00, 150.00, false, 2, false, []),
      ]);
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

          <AppFabButton onPress={() => console.log('AAAA')} position='bottom-right' />
        </View>
      </CoordenadorTemplate>
    );
}
