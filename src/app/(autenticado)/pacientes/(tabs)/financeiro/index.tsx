import * as React from 'react';
import { View, Text } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';
import { AppColors } from '../../../../../templates/colors';

export interface FinanceiroScreenProps {
}

export default function FinanceiroScreen (props: FinanceiroScreenProps) {
    return (
        <PacienteTemplate title="Financeiro" color={AppColors.danger}>
            <Text>AAAAA</Text>
        </PacienteTemplate>
    );
}
