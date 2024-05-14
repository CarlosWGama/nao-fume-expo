import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { AppColors } from './colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppHeaderButton } from './components';
import { auth } from '../config/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export interface PacienteTemplateProps {
    title: string;
    children: any;
    color?: string;
}

export default function PacienteTemplate ({title, children, color = AppColors.primary}: PacienteTemplateProps) {
     // ==============================================================================
     const handleSair = async () => {
        auth.signOut();
        router.replace('/login')
    }
    // ===============================================================================

    return (
      <View style={styles.container}>
            {/* HEADER */}
            {/* ============= HEADER ============= */}
            <View style={[styles.header, { backgroundColor: color }]} >
                    {/* BTN SAIR */}
                    <TouchableOpacity onPress={handleSair}>
                        <View style={styles.btnSairContainer}>
                            <MaterialIcons name="exit-to-app" color="white" size={22} />
                            <Text style={{color:'white', fontSize: 18, fontWeight: 'bold' }}>Sair</Text>
                        </View>
                    </TouchableOpacity>

                    {/* HEADER */}
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>

            {/* MAIN */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
                >
                    {children}
            </KeyboardAvoidingView>

            {/* TAB BAR */}
            <View style={[styles.bar, { backgroundColor: color}]}>
                <AppHeaderButton icon='person' title='Perfil' page='/pacientes/perfil' selecionado={title == 'Perfil'} />
                <AppHeaderButton icon='cash' title='Financeiro' page='/pacientes/financeiro' selecionado={title == 'Financeiro'} />
                <AppHeaderButton icon='trophy' title='Conquistas' page='/pacientes/conquistas' selecionado={title == 'Conquistas'} />
                <AppHeaderButton icon='people' title='Chat' page='/pacientes/chat' selecionado={title == 'Chat'} />
            </View>
      </View>
    );   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 10,
        paddingTop: 40,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        color: 'white', 
        textAlign: 'center', 
        flex: 1,
        fontWeight:'bold',
        fontSize: 20,
        margin: 5
    },
    btnSairContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },


    bar : {
        height: 70,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});
