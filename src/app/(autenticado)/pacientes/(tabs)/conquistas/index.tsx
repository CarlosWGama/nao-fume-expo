import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';
import { AppColors } from '../../../../../templates/colors';
import { usePacienteContext } from '../../../../../contexts/paciente-context';
import { useConquistasService } from '../../../../../services/conquistas.service';

export interface ConquistasScreenProps {
}

export default function ConquistasScreen (props: ConquistasScreenProps) {

    const { usuario } = usePacienteContext();
    const conquistasService = useConquistasService();
  
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
                <Text style={styles.sessaoText}>Conquistas Alcançadas</Text>
                <View style={styles.cards}>
                    {conquistasService.buscarConquistasExistentes().filter(c => usuario?.conquistasAlcancadas.includes(c.codigo)).map(conquista => (
                        <View style={[styles.card, { width: 150}]} key={conquista.codigo}>
                            <Text style={styles.cardH1}>{conquista.titulo}</Text>
                            <Image source={conquista.imagem} style={{width: 75, height: 75}} />
                            <Text style={styles.cardDescricao}>{conquista.descricao}</Text>
                        </View>
                        
                    ))}
                </View>

                {/* PROXIMAS CONQUISTAS */}
                <Text style={styles.sessaoText}>Próximas Conquistas</Text>
                <View style={styles.cards}>
                    {conquistasService.buscarConquistasExistentes().filter(c => !usuario?.conquistasAlcancadas.includes(c.codigo)).map(conquista => (
                        <View style={[styles.card, { width: 150, backgroundColor: '#a098a2'}]} key={conquista.codigo}>
                            <Text style={styles.cardH1}>{conquista.titulo}</Text>
                            <Image source={conquista.imagem} style={{width: 75, height: 75}} />
                            <Text style={styles.cardDescricao}>{conquista.descricao}</Text>
                        </View>
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