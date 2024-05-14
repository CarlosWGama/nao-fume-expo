import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export interface InputProps {
    label: string
    onChangeText(text:string): void
    password?: boolean;
    keyboardType?: 'default'|'number-pad';
}

export default function AppInput ({label, password = false, onChangeText, keyboardType = 'default'}: InputProps) {
    return (
      <View style={styles.container}>
         <Text style={styles.label}>{label}</Text>
         <TextInput style={styles.input} secureTextEntry={password} onChangeText={onChangeText} keyboardType={keyboardType}/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginBottom: 10

    },
    label: {
        color: 'white',
        fontSize: 14
    },
    input: {
       borderBottomColor: 'white',
       borderBottomWidth: 1
    }
});