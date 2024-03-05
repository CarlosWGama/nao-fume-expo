import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Paciente } from '../../../../../models/paciente';

export interface AppHeaderRelatorioProps {
    pacientes: Paciente[]
}


function AppHeaderRelatorio ({ pacientes }: AppHeaderRelatorioProps) {
    return (
        <View>
            <LinearGradient colors={['#009efd', '#00539c']} style={styles.container}>
                <Text style={styles.title}>Dias sem fumar</Text>
                <View style={styles.rank}>
                    {/* PRATA */}
                    <View style={styles.tier}>
                        <Image source={require('./../../../../../assets/imgs/trofel-prata.png')} style={{height:50, width: 40}} />
                        { pacientes.length >= 2 && <>
                            <Text style={styles.paciente}>{pacientes[1].nome}</Text>
                            <Text style={styles.dias}>{pacientes[1].diasSeguidosSemFumar} dias </Text>
                        </>}
                    </View>
                    {/* OURO */}
                    <View style={styles.tier}>
                        <Image source={require('./../../../../../assets/imgs/trofel-ouro.png')} style={{height:70, width: 50}} />
                        { pacientes.length >= 1 && <>
                            <Text style={styles.paciente}>{pacientes[0].nome}</Text>
                            <Text style={styles.dias}>{pacientes[0].diasSeguidosSemFumar} dias </Text>
                        </>}
                    </View>

                    {/* BRONZE */}
                    <View style={styles.tier}>
                        <Image source={require('./../../../../../assets/imgs/trofel-bronze.png')} style={{height:50, width: 40}} />
                        { pacientes.length >= 3 && <>
                            <Text style={styles.paciente}>{pacientes[2].nome}</Text>
                            <Text style={styles.dias}>{pacientes[2].diasSeguidosSemFumar} dias </Text>
                        </>}
                    </View>
                </View>
            </LinearGradient>
            <Image source={require('./../../../../../assets/imgs/wave-blue.png')} style={{height: 120, width: '100%'}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 180,
        paddingHorizontal: 5
    },
    title: {
        color: 'white',
        fontSize: 22,
        margin: 5,
        textAlign: 'center'
    },
    rank: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 10
    },
    tier: {
        alignItems: 'center'
    },
    paciente: {
        color: 'white',
        fontSize: 18
    },
    dias: {
        color: 'white'
    }
});

export default React.memo(AppHeaderRelatorio);