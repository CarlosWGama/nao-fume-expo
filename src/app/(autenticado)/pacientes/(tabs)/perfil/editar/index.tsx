import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { usePacienteContext } from '../../../../../../contexts/paciente-context';
import { Formik } from 'formik';
import { AppButton, AppItemForm } from '../../../../../../templates/components';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { FormSenha } from './components/form-senha';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { Paciente, avatarURL } from '../../../../../../models/paciente';
import Toast from 'react-native-root-toast';
import { usePacientesService } from '../../../../../../services/pacientes.service';
import * as Yup from 'yup';

export interface PacienteEditarScreenProps {
}

export default function PacienteEditarScreen (props: PacienteEditarScreenProps) {
    const { usuario, setUsuario } = usePacienteContext();
    const pacientesSrv = usePacientesService();
    // ====================================================================================
    const handleAlterarDados = async ({precoCigarro, avatar}) => {
        const novosDados = {...usuario, precoCigarro: parseFloat(precoCigarro), avatar} as Paciente;
        
        setUsuario(novosDados)
        Toast.show('Dados atualizados');
        pacientesSrv.atualizar(novosDados);

    }
    // ====================================================================================
    return (
      <ScrollView style={styles.container}>
            {/* -------- SENHA ---------- */}
            <Text style={styles.h1}>Acesso</Text>
            <FormSenha />
            {/* -------- OUTRAS INFORMAÇÕES ---------- */}
            <Text style={styles.h1}>Outras Informações</Text>
            <Formik
                initialValues={{precoCigarro: usuario?.precoCigarro.toFixed(2), avatar: usuario?.avatar}}
                validationSchema={Yup.object({
                    precoCigarro: Yup.number().required('campo obrigatório')
                })}
                onSubmit={handleAlterarDados} >
                {({values, touched, errors, handleBlur, handleChange, isSubmitting, handleSubmit, isValid, setFieldValue}) => (
                    <>
                        <AppItemForm label='Preço do cigarro' error={(touched.precoCigarro && errors.precoCigarro)}>
                            <MaskInput style={{flex:1, marginLeft: 10}} 
                                value={""+values.precoCigarro}  
                                onChangeText={handleChange('precoCigarro')} 
                                onBlur={handleBlur('precoCigarro')}
                                placeholder='Valor em reais' 
                                keyboardType='decimal-pad'
                                mask={createNumberMask({precision: 2, separator: '.', delimiter: ''})	}/>

                        </AppItemForm>

                        <AppItemForm label='Alterar foto'>
                                <RadioGroup
                                        radioButtons={[
                                            {id: '1', label: 'Homem 1', value: "1" },
                                            {id: '2', label: 'Homem 2', value: "2" },
                                            {id: '3', label: 'Homem 3', value: "3" },
                                            {id: '4', label: 'Homem 4', value: "4" },
                                            {id: '5', label: 'Homem 5', value: "5" },
                                            {id: '6', label: 'Homem 6', value: "6" },
                                            {id: '7', label: 'Mulher 7', value: "7" },
                                            {id: '8', label: 'Mulher 8', value: "8" },
                                            {id: '9', label: 'Mulher 9', value: "9" },
                                            {id: '10', label: 'Mulher 10', value: "10" },
                                            {id: '11', label: 'Mulher 11', value: "11" },
                                            {id: '12', label: 'Mulher 12', value: "12" },
                                            
                                        ]}
                                        selectedId={""+values.avatar}
                                        containerStyle={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', width: '60%'}}
                                        labelStyle={{fontSize: 12}}
                                        onPress={ (value) => setFieldValue(`avatar`, parseInt(value)) }
                                    />
                        </AppItemForm>
                        <Image source={avatarURL(values.avatar)} style={styles.avatar}/>
                        <AppButton title='Alterar dados' disabled={isSubmitting || !isValid} onPress={handleSubmit}/>
                    </>
                )}
            </Formik>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10, 
        flex: 1,
        backgroundColor: 'white'
    },
    h1: {
        color: 'grey', 
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center'
    },
    avatar: {
        height: 100,
        width: 100, 
        borderRadius: 100,
        alignSelf: 'center',
        margin: 5
    }
});
