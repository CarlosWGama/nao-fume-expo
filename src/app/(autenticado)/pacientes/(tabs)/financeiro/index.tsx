import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';
import { AppColors } from '../../../../../templates/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { usePacienteContext } from '../../../../../contexts/paciente-context';
import FabButton from '../../../../../templates/components/fab-button';
import { Meta } from '../../../../../models/meta';
import { useMetasService } from '../../../../../services/metas.service';
import { AppButton, AppLabel } from '../../../../../templates/components';
import Toast from 'react-native-root-toast';
import { Paciente } from '../../../../../models/paciente';
import * as Progress from 'react-native-progress';
import { Modalize } from 'react-native-modalize';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput } from 'react-native-gesture-handler';
import MaskInput, { createNumberMask } from 'react-native-mask-input';

export interface FinanceiroScreenProps {
}

export default function FinanceiroScreen (props: FinanceiroScreenProps) {
    const { usuario, setUsuario } = usePacienteContext();
    const metasService = useMetasService();
    const [ metas, setMetas ] = React.useState<Meta[]>([]);
    const modalRef = React.useRef<Modalize>();
    // ===========================================================================
    const handleAdicionarMeta = async () => {
        modalRef.current?.open();
    }
    // ----------
    const handleRemover = async (meta: Meta) => {
        Alert.alert('Remover meta?', meta.titulo, [
            {text: 'Cancelar'},
            {text: 'Usar', onPress: () => {
                const metaIndex = metas.indexOf(meta);
                setMetas(metas.filter((meta, index) => index != metaIndex))
                metasService.remover(meta);
                Toast.show('Meta removida!')
            }}
        ])

    }
    // ----------
    const handleUsar= async (meta: Meta) => {
        Alert.alert('Usar meta?', meta.titulo, [
            {text: 'Cancelar'},
            {text: 'Usar', onPress: () => {
                metasService.usar(meta);
                let { dinheiroDisponivel } = usuario as Paciente;
                dinheiroDisponivel -= meta.objetivo;
                setUsuario({...usuario, dinheiroDisponivel})
                setMetas(metas.map((m) => {
                    if (m.uid == meta.uid)  m.usado = true;
                    return m;
                    
                }));
                Toast.show('Meta usada!')
            }}
        ])
    }
    // ----------
    const handleCadastrar = async (meta: Meta) => {
        meta.objetivo = parseFloat(meta.objetivo);
        const retorno = await metasService.cadastrar(meta);
        if (retorno.sucesso) {
            metas.push(meta);
            setMetas([...metas]);
            Toast.show('Meta cadastrada com suceeso');
            modalRef.current?.close()
        } else {
            Toast.show('Falha na operação');
        }
    }
    // ----------
    const buscarMetas = async () => {
        setMetas(await metasService.buscarMetas())
    }
    // ----------
    const calcularPorcentagem = (meta: Meta) => {
        let valor = usuario?.dinheiroDisponivel / meta.objetivo;
        return Math.min(1, valor);
    }
    // ----------
    React.useEffect(() => {
        buscarMetas();
    }, []);
    // ============================================================================
    return (
        <PacienteTemplate title="Financeiro" color={AppColors.danger}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {/* HEADER */}
                <LinearGradient colors={[AppColors.danger, 'white']} 
                    start={[0,0.5]} end={[0, 1]}
                    style={styles.headerContainer}>
                        <Text style={styles.h1}>Total economizado R${usuario?.dinheiroAcumulado.toFixed(2)}</Text>
                        <Text style={styles.h2}>Dinheiro disponível R${usuario?.dinheiroDisponivel.toFixed(2)}</Text>
                </LinearGradient>

                {/* CONTEUDOS */}
                <View style={{flex: 1}}>
                    <Text style={styles.hMetas}>Metas</Text>

                    <FlatList
                        data={metas}
                        renderItem={({item, index}) => (
                            <View style={styles.card} key={""+index}>
                                <Text style={styles.cardTitle}>{item.titulo}</Text>

                                {/* OBJETIVO */}
                                <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 12, color: 'grey'}}>Objetivo: R${item.objetivo?.toFixed(2)}</Text>

                                    {item.usado && <AppLabel text='REALIZADO!' color={AppColors.success} />}
                                    {!item.usado && item.objetivo <= usuario?.dinheiroDisponivel && <AppLabel text='Pode usar!' color="#7044ff" />}
                                </View>

                                {/* PROGRESSÃO */}
                                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                    <Text style={{fontSize: 12, color: 'grey'}}>Progressão: </Text>
                                    <Progress.Bar progress={calcularPorcentagem(item)} color={AppColors.danger} borderRadius={10}  height={10} width={200} style={{marginVertical: 10, alignSelf: 'center'}} />
                                </View>

                                {/* BOTÕES */}
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                                    <AppButton title='  Remover  ' transparent
                                        onPress={() => handleRemover(item)} 
                                        icon="trash"
                                        color={AppColors.danger} 
                                        textColor={AppColors.danger}/>


                                    { !item.usado && item.objetivo <= usuario?.dinheiroDisponivel &&                                     
                                        <AppButton title='  Usar  ' transparent
                                            onPress={() => handleUsar(item)} 
                                            icon="checkmark"
                                            color={AppColors.success} 
                                            textColor={AppColors.success}/>}
                                </View>
                            </View>
                        )}
                    />
                        <FabButton color={AppColors.danger} onPress={handleAdicionarMeta}/>
                    
                </View>
                {/* ================  MODAL CADASTRO DE META ============ */}
                <Modalize ref={modalRef} adjustToContentHeight modalStyle={{padding:20}} >
                    <Formik
                        initialValues={{titulo: '', objetivo: 0}}
                        validationSchema={Yup.object({
                            titulo: Yup.string().required('Campo obrigatório'),
                            objetivo: Yup.number().required('Campo obrigatório')
                        })}
                        onSubmit={handleCadastrar}
                    >
                        {({values, touched, errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValid}) => (
                            <View>
                                <Text style={{fontSize: 25, textAlign: 'center'}}>Cadastrar nova meta</Text>
                                
                                <TextInput onChangeText={handleChange('titulo')} placeholder='Digite o nome da meta' style={styles.input} onBlur={handleBlur('titulo')}/>
                                { touched.titulo && errors.titulo && <Text style={styles.error}>{errors.titulo}</Text>}

                                <MaskInput 
                                    value={""+values.objetivo}
                                    onChangeText={handleChange('objetivo')} 
                                    placeholder='O valor da meta' 
                                    style={styles.input} 
                                    onBlur={handleBlur('objetivo')} 
                                    keyboardType='decimal-pad'
                                    mask={createNumberMask({precision: 2, separator: '.'})	}
                                    />
                                { touched.objetivo && errors.objetivo && <Text style={styles.error}>{errors.objetivo}</Text>}

                                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
                                    <AppButton title="  Cadastrar  " onPress={handleSubmit} color={AppColors.success} disabled={isSubmitting || !isValid} />
                                    <AppButton title="Remover" onPress={() => modalRef.current?.close()} color={AppColors.danger}/>
                                </View>
                            </View>
                        )}
                    </Formik>
                </Modalize>
            </View>
        </PacienteTemplate>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 200,
        alignItems: 'center',
        paddingTop: 10
    },
    h1: {
        color: 'white',
        fontSize: 27
    },
    h2: {
        color: 'white',
        fontSize: 20
    },
    hMetas: {
        color: 'grey',
        fontSize: 25,
        textAlign: 'center'
    },

    card: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: 'white'
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        margin: 5
    },
    error: {
        color: 'tomato',
        textAlign: 'right'
    }
});