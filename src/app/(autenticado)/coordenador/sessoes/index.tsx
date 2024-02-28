import { View, Text } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';

export interface SessoesProps {
}

export default function Sessoes (props: SessoesProps) {
    return (
      <CoordenadorTemplate title='Sessões'>
         <Text>Sessoes</Text>
      </CoordenadorTemplate>
    );
}
