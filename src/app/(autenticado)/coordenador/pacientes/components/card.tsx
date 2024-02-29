import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Paciente } from '../../../../../models/paciente';
import { LinearGradient } from 'expo-linear-gradient';

export interface CardPacienteProps {
    paciente: Paciente;
    position: number
}

function CardPaciente ({paciente, position}: CardPacienteProps) {

    const colors = [
        [ '#ff8177', '#b12a5b' ],
        [ '#f6d365', '#fda085' ],
        [ '#616161', '#adadad' ],
        [ '#5ee7df', '#b490ca' ],
    ];
    // ==========================================================
    return (
        <LinearGradient style={styles.container}  start={{x: 0, y: 0}} end={{x:1, y: 1}} colors={colors[position%colors.length]}  >
            {/* AVATAR */}
            <Image source={paciente.avatarURL} style={styles.avatar}/>

            {/* DADOS */}
            <View style={{flex: 1}}>
                
                <View style={{marginBottom:5}}>
                    <Text style={[styles.text, {textAlign: 'justify', fontSize: 12, fontWeight: 'bold'}]}>{paciente.nome}</Text>
                    <Text style={[styles.text, {textAlign: 'justify'}]}>Código: {paciente.codigo}</Text>
                </View>

                <View style={styles.metrics}>
                    <View>
                        <Text style={styles.text}>Cigarros evitados</Text>
                        <Text style={styles.text}>{paciente.cigarrosEvitados}</Text>
                    </View>

                    <View>
                        <Text style={styles.text}>Dias sem Fumar</Text>
                        <Text style={styles.text}>{paciente.diasSemFumar}</Text>
                    </View>

                    <View>
                        <Text style={styles.text}>Max. dias sem fumar</Text>
                        <Text style={styles.text}>{paciente.maxDiasSemFumar}</Text>
                    </View>
                </View>

            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 2,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        margin: 10
    },
    text: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center'
    },
    metrics: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        flex: 1,
    }
});

export default React.memo(CardPaciente);
