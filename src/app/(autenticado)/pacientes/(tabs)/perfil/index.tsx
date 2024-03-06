import * as React from 'react';
import { View, Text } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';
import { AppColors } from '../../../../../templates/colors';

export interface PerfilScreenProps {
}

export default function PerfilScreen (props: PerfilScreenProps) {
    return (
      <PacienteTemplate title="Perfil" color={AppColors.warning}>
        <Text>AAAAA</Text>
      </PacienteTemplate>
    );
}
