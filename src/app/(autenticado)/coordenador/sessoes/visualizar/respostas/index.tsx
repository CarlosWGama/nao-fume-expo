import * as React from 'react';
import { View, Text } from 'react-native';
import { AppTemplateSessao } from '../components';

export interface SessoesRespostaslSecreenProps {
}

export default function SessoesRespostasSecreen (props: SessoesRespostaslSecreenProps) {
    return (
        <AppTemplateSessao title='Respostas'>
            <Text>Respostas</Text>
        </AppTemplateSessao>
    );
}
