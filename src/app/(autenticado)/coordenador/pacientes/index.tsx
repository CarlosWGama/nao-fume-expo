import { View, Text } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';

export interface PacientesProps {
}

export default function Pacientes (props: PacientesProps) {
    return (
      <CoordenadorTemplate title='Pacientes'>
         <Text>Pacientes</Text>
      </CoordenadorTemplate>
    );
}
