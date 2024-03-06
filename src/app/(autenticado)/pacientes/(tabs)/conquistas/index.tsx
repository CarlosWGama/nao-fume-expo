import * as React from 'react';
import { View, Text } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';
import { AppColors } from '../../../../../templates/colors';

export interface ConquistasScreenProps {
}

export default function ConquistasScreen (props: ConquistasScreenProps) {
    return (
        <PacienteTemplate title="Conquistas" color={AppColors.success}>
            <Text>AAAAA</Text>
        </PacienteTemplate>
    );
}
