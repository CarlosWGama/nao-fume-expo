import { View, Text, FlatList } from 'react-native';
import { CoordenadorTemplate } from '../../../../templates/template-coordenador';
import { useState } from 'react';

export interface RelatoriosProps {
}

export default function Relatorios (props: RelatoriosProps) {
    // =========================================================
    return (
      <CoordenadorTemplate title='Relatórios'>
        <Text>Relatório</Text>
      </CoordenadorTemplate>
    );
}
