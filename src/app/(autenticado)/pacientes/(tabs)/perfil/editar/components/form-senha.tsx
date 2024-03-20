import { Formik } from 'formik';
import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import * as Yup from 'yup';
import { useUsuariosService } from '../../../../../../../services/usuarios.service';
import { usePacienteContext } from '../../../../../../../contexts/paciente-context';
import { AppButton, AppItemForm } from '../../../../../../../templates/components';

export interface FormSenhaProps {
}

export function FormSenha (props: FormSenhaProps) {
    const usuariosSrv = useUsuariosService();
    // ====================================================================================
    const handleAlterarSenha = async ({senha}) => {
        try {
            await usuariosSrv.alterarSenha(senha);
            Toast.show('Senha alterada');
        } catch( e ) {
            Toast.show('Não foi possível alterar senha. Deslogue e logue novamente para garantir que é você. ');
        }
    }
    // ====================================================================================
    return (
        <Formik
        initialValues={{senha: ''}}
        validationSchema={Yup.object({ senha: Yup.string().required('Campo obrigatório').min(6, 'A senha precisa ter 6 caracteres') })}
        onSubmit={handleAlterarSenha} >
        {({values, touched, errors, handleBlur, handleChange, isSubmitting, handleSubmit, isValid}) => (
            <>
                <AppItemForm label='Nova senha' error={(touched.senha && errors.senha)}>
                    <TextInput 
                        placeholder='Digite sua nova senha, caso deseje trocar' value={values.senha} 
                        secureTextEntry onChangeText={handleChange('senha')} 
                        onBlur={handleBlur('senha')} />

                </AppItemForm>
                <AppButton title='Salvar nova senha' disabled={!isValid} loading={isSubmitting} onPress={handleSubmit}/>
            </>
        )}
    </Formik>
    );
}