import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';
import { AppColors } from '../../../../../templates/colors';
import { usePacienteContext } from '../../../../../contexts/paciente-context';
import { useConquistasService } from '../../../../../services/conquistas.service';
import * as Speech from 'expo-speech';

export interface ConquistasScreenProps {
}

export default function ConquistasScreen (props: ConquistasScreenProps) {

    const { usuario } = usePacienteContext();
    const conquistasService = useConquistasService();
    // ================================================
    const falar = async (msg) => {
        Speech.speak(msg, { language: 'pt' });
    }
    //=============================================================
    return (
        <PacienteTemplate title="Conquistas" color={AppColors.success}>
            <ScrollView style={{padding: 5, paddingBottom: 10, flex: 1}}>

                {/* ESTATISTICA GERAL */}
                <View style={styles.card}>
                    <Text style={styles.cardH1}>Estatística</Text>
                    <Image source={require('./../../../../../assets/imgs/trofel-ouro.png')} style={{width: 150, height: 200}} />
                    <Text>Até o momento você alcançou</Text>
                    <Text style={styles.cardH1}> {usuario?.conquistasAlcancadas ? usuario?.conquistasAlcancadas.length : 0} Conquistas</Text>
                </View>

                {/* CONQUISTAS ALCANÇADAS */}
                <TouchableOpacity onPress={() => falar('Essas são suas conquitas alcançadas')}>
                    <Text style={styles.sessaoText}>Conquistas Alcançadas</Text>
                </TouchableOpacity>
                <View style={styles.cards}>
                    {conquistasService.buscarConquistasExistentes().filter(c => usuario?.conquistasAlcancadas.includes(c.codigo)).map(conquista => (
                        <TouchableOpacity key={conquista.codigo} onPress={() => falar(conquista.descricao)} >
                            <View style={[styles.card, { width: 150}]} >
                                <Text style={styles.cardH1}>{conquista.titulo}</Text>
                                <Image source={conquista.imagem} style={{width: 75, height: 75}} />
                                <Text style={styles.cardDescricao}>{conquista.descricao}</Text>
                            </View>
                        </TouchableOpacity>
                        ))}
                </View>

                {/* PROXIMAS CONQUISTAS */}
                <TouchableOpacity onPress={() => falar('Essas são as conquitas que você ainda não alcançou')}>
                    <Text style={styles.sessaoText}>Próximas Conquistas</Text>
                </TouchableOpacity>
                <View style={styles.cards}>
                    {conquistasService.buscarConquistasExistentes().filter(c => !usuario?.conquistasAlcancadas.includes(c.codigo)).map(conquista => (
                        <TouchableOpacity key={conquista.codigo} onPress={() => falar(conquista.descricao)}>
                            <View style={[styles.card, { width: 150, backgroundColor: '#a098a2'}]} >
                                <Text style={styles.cardH1}>{conquista.titulo}</Text>
                                <Image source={conquista.imagem} style={{width: 75, height: 75}} />
                                <Text style={styles.cardDescricao}>{conquista.descricao}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </PacienteTemplate>
    );
}

const styles = StyleSheet.create({
    card: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        margin: 5,
        elevation: 10
    },
    cardH1: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    cardDescricao: {
        textAlign: 'center',
        fontSize: 12,
        margin: 10
    },
    cards: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    sessaoText: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 20
    }

});