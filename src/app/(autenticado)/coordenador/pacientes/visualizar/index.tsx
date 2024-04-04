import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { useCoordenadorContext } from '../../../../../contexts/coordenador-context';
import { avatarURL } from '../../../../../models/paciente';
import { AppBackButton, AppLabel } from '../../../../../templates/components';
import { AppColors } from '../../../../../templates/colors';
import { Questionario } from '../../../../../models/questionario';
import { dataFormat } from '../../../../../helpers/general';
import { router } from 'expo-router';
import { useSessoesService } from '../../../../../services/sessoes.service';
import auth from '@react-native-firebase/auth';

export interface PacienteVisualizarProps {
}

export default function PacienteVisualizarScreen (props: PacienteVisualizarProps) {


    const { paciente } = useCoordenadorContext();
    const sessoesSrv = useSessoesService();
    const [ participacoes, setParticipacoes ] = React.useState(0);
    // ================================================================
    const handleEditar = async () => {
        router.push('/coordenador/pacientes/editar')
    }   
    // ---------
    React.useEffect(() => {
        (async() => {
            let participacoes = 0;
            const sessoes = await sessoesSrv.buscarSessoes(auth().currentUser?.uid);
            sessoes.forEach(s => {
                s.dadosPacientes.forEach(dados => {
                    if (dados.pacienteUID == paciente?.uid && dados.presente) participacoes++;
                })
            })

            setParticipacoes(participacoes);
        })()
    }, []) 
    // ================================================================
    return (
        <View style={{flex: 1}}>
            {/* ========= HEADER  ========= */}
            <LinearGradient 
                style={styles.header}
                colors={['#009efd', '#0c2dd4']} 
                start={{x: 0, y: 0}} 
                end={{x: 0, y: 1}}>

                {/* BOTÕES */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <AppBackButton/>

                    <TouchableOpacity onPress={handleEditar}>
                        <Text style={{color:'white'}}>EDITAR</Text>
                    </TouchableOpacity>
                </View>

                {/* HEADER INFO */}
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color:'white', fontWeight: 'bold', marginBottom: 10}}>Paciente</Text>
                        
                        <View>
                            <Image source={avatarURL(paciente.avatar)} style={styles.avatar}/>
                            <Text style={{color:'white'}}>Código: {paciente.codigo}</Text>
                        </View>
                    </View>

                    {/* CONTAINER */}
                    <View style={styles.headerInfoContainer}>
                        
                        <View style={styles.infoRow}>
                            <Text>{paciente.nome}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <AppLabel text={""+participacoes} size={12} />
                            <Text style={{fontSize: 12}}>Sessões idas</Text>
                        </View>
            
                        <View style={styles.infoRow}>
                            <AppLabel text={""+paciente.diasSemFumar} size={12}/>
                            <Text style={{fontSize: 12}}>Dias sem fumar</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <AppLabel text={""+paciente.mediaCigarros} size={12}/>
                            <Text style={{fontSize: 12}}>Média cigarro ao dia</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <AppLabel text={""+paciente.cigarrosEvitados} size={12}/>
                            <Text style={{fontSize: 12}}>Cigarros evitados</Text>
                        </View>

                        <View style={styles.infoRow}>
                        <AppLabel text={"R$"+paciente.dinheiroAcumulado} size={12} color={AppColors.success}/>
                            <Text style={{fontSize: 12}}>Economizado</Text>
                        </View>
                    </View>
                </View>
            
            </LinearGradient>
            <Image source={require('./../../../../../assets/imgs/user-top.png')} style={styles.userTop}/>
            {/* ======== MAIN ======== */}
            <View style={{paddingHorizontal: 5, marginTop: -10, flex: 1}}>
                <Text style={{textAlign:'center', color: '#989aa2', fontSize: 18}}>Histórico</Text>
                {/* TABELA */}
                <View style={styles.historicoRow}>
                    <Text style={styles.tableHeader}>Data</Text>
                    <Text style={styles.tableHeader}>Abstinente</Text>
                    <Text style={styles.tableHeader}>Vontade</Text>
                    <Text style={styles.tableHeader}>Atv. Física</Text>
                    <Text style={styles.tableHeader}>Humor</Text>
                </View>

                <FlatList
                    data={paciente?.questionariosDiarios}
                    extraData={paciente?.questionariosDiarios}
                    renderItem={({item, index}) => (
                        <View style={styles.historicoRow} key={""+index}>
                            <View style={styles.tableData}>
                                <Text style={{fontSize: 12}}>{dataFormat(item.dia)}</Text>
                            </View>
                            {/* ABSTINENTE? */}
                            <View style={styles.tableData}>
                                {!item.fumou && <AppLabel text="SIM" color={AppColors.success} size={10}/>}
                                {item.fumou && <AppLabel text="NÃO" color={AppColors.danger} size={10} />}
                            </View>
                            {/* VONTADE DE FUMAR */}
                            <View style={styles.tableData}>
                                {item.vontadeFumar == 0 && <AppLabel text="BAIXA" color={AppColors.success} size={10} />}
                                {item.vontadeFumar == 1 && <AppLabel text="MÉDIA" color={AppColors.warning} size={10} />}
                                {item.vontadeFumar == 2 && <AppLabel text="ALTA" color={AppColors.danger} size={10} />}
                            </View>
                            {/* EXERCITOU-SE? */}
                            <View style={styles.tableData}>
                                {item.exercitou && <AppLabel text="SIM" color={AppColors.success} size={10} />}
                                {!item.exercitou && <AppLabel text="NÃO" color={AppColors.danger} size={10} />}
                            </View>
                            {/* HUMOR */}
                            <View style={styles.tableData}>
                                {item.humor == 0 && <AppLabel text="BAIXA" color={AppColors.danger} size={10}/>}
                                {item.humor == 1 && <AppLabel text="MÉDIO" color={AppColors.warning} size={10} />}
                                {item.humor == 2 && <AppLabel text="ALTO" color={AppColors.success} size={10} />}
                            </View>
                        </View> 
                    )}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 300,
        paddingHorizontal: 20,
        paddingTop: 45
    },
    userTop: {
        width: '100%',
        height: 70,
        objectFit: 'fill'
    },
    avatar: {
        width: 100, 
        height: 100,
        borderRadius: 100
    },
    headerInfoContainer: {
        backgroundColor: 'white',
        width: '70%',
        borderRadius: 10, 
        padding: 10
    },
    infoRow: {
        flexDirection: 'row',
        borderBottomColor: '#dedede',
        borderBottomWidth: 1,
        padding: 5
    },
    mainContainer: {

    },
    historicoRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        paddingVertical: 5
    },
    tableHeader: {
        fontWeight: 'bold', 
        fontSize: 12,
        flex: 1,
        textAlign: 'center'
    },
    tableData: {
        flex: 1,
        alignItems: 'center'
    }
    
});
