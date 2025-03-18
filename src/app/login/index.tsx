import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as React from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { AppInput } from './components';
import { AppButton } from '../../templates/components';
import { router } from 'expo-router';
import { usePacienteContext } from '../../contexts/paciente-context';
import { Paciente } from '../../models/paciente';
import { useUsuariosService } from '../../services/usuarios.service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen (props) {

    const [ erro, setErro ] = React.useState<null|string>(null);
    
    const usuarioSrv = useUsuariosService();
    const { setUsuario } = usePacienteContext();
    // =========================================================================
    const handleLogin = async ({codigo, senha}) => {
      setErro(null)
      const { logado, paciente, nivel } = await usuarioSrv.logar(codigo, senha);
      //Falha login
      if (!logado) {
        setErro('Código ou senha incorreta!');
        return;
      }

      //Logado como Coordenador
      if (nivel == 'coordenador') router.replace('/coordenador/pacientes')
      else {
        setUsuario(paciente)
        if (paciente?.primeiroAcesso)
            router.replace('/pacientes/questionarios/primeiro-acesso')
        else
            router.replace('/pacientes/questionarios/diario')
      } 
        
    } 
    // =========================================================================
    return (
      
      
      <LinearGradient
        colors={['#2af598', '#009efd']}
        style={{flex: 1}}
      >

        <KeyboardAwareScrollView style={{flex: 1}} >
            <ScrollView automaticallyAdjustKeyboardInsets={true} style={{flex: 1}} contentContainerStyle={styles.container}>
              {/* LOGO */}
              <Image source={require('./../../assets/imgs/logo.png')} style={styles.logo}/>
              <Text style={[styles.text, {fontSize: 40, textAlign: 'center', fontWeight: 'bold', color: 'white'}]}>Sessão NãoFume {"\n"} PRO</Text>

              {/* FORM */}
              <Formik
                initialValues={{codigo: '', senha: ''}}
                onSubmit={handleLogin} >
                {({handleChange, handleSubmit, isSubmitting}) => (
                  <View style={styles.form}>
                      <Text style={[styles.text, {textAlign: 'center', fontSize: 20}]}>Acesse</Text>
                      <AppInput label="Código" onChangeText={handleChange('codigo')} keyboardType='number-pad'/>
                      <AppInput label="Senha" onChangeText={handleChange('senha')} password/>

                      {erro && <Text style={styles.textError}>{erro}</Text>}

                      <AppButton title="ACESSAR" onPress={handleSubmit} transparent color='white' loading={isSubmitting} />
                  </View>
                )}
              </Formik>

              {/* FOOTER */}
              <Text style={[styles.text, {fontSize: 20}]}>CESMAC</Text>

            </ScrollView>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'stretch'
  },
  text: {
    color: 'white',
    margin: 5
  },
  textError: {
    color: 'red',
    textAlign: 'center',
    margin: 5
  }
});