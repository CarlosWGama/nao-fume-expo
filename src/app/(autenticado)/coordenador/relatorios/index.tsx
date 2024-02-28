import { View, Text } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';

export interface RelatoriosProps {
}

export default function Relatorios (props: RelatoriosProps) {
    return (
      <CoordenadorTemplate title='Relatórios'>
         <Text>Relatórios</Text>
      </CoordenadorTemplate>
    );
}
