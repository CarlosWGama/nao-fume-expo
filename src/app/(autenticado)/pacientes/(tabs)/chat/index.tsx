import * as React from 'react';
import { View, Text } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';

export interface ChatScreenProps {
}

export default function ChatScreen (props: ChatScreenProps) {
    return (
        <PacienteTemplate title="Chat">
            <Text>AAAAA</Text>
        </PacienteTemplate>
    );
}
