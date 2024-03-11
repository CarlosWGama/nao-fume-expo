import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from './colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppHeaderButton } from './components';
import { getAuth } from 'firebase/auth';

export interface CoordenadorTemplateProps {
    title: string
    children: any
}

export function CoordenadorTemplate ({children, title}: CoordenadorTemplateProps) {

    // ==============================================================================
    const handleSair = async () => {
        const auth = getAuth();
        auth.signOut();
        router.replace('/login')
    }

    // ===============================================================================
    return (
        
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.container}>
                {/* ============= HEADER ============= */}
                <View style={styles.header} >
                    {/* BTN SAIR */}
                    <TouchableOpacity onPress={handleSair}>
                        <View style={styles.btnSairContainer}>
                            <MaterialIcons name="exit-to-app" color="white" size={18} />
                            <Text style={{color:'white', fontSize: 14, fontWeight: 'bold' }}>Sair</Text>
                        </View>
                    </TouchableOpacity>

                    {/* HEADER */}
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>


                {/* ============= MENU ============= */}
                <View style={{flexDirection: 'row', padding: 5, justifyContent: 'center'}}>
                    <AppHeaderButton icon="person" title="Pacientes" page="/coordenador/pacientes" selecionado={title == 'Pacientes'}/>
                    <AppHeaderButton icon="newspaper" title="Sessões"  page="/coordenador/sessoes" selecionado={title == 'Sessões'}/>
                    <AppHeaderButton icon="ribbon" title="Relatórios"  page="/coordenador/relatorios" selecionado={title == 'Relatórios'}/>
                </View>
            </View>
            
            {/* ============= MAIN ============== */}
            {children}
        </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.primary,
        paddingTop: 30,
        paddingHorizontal: 10
    },
    header: {
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
    }

});