import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AppInput } from './components';
import { AppButton } from '../../templates/components';
import { router } from 'expo-router';
import { usePacienteContext } from '../../contexts/paciente-context';
import { Paciente } from '../../models/paciente';


export default function LoginScreen (props) {

    const [ erro, setErro ] = React.useState<null|string>(null);
    // =========================================================================
    const handleLogin = async ({codigo, senha}) => {
      setErro(null)
      await new Promise(resolve => setTimeout(() => resolve(), 300))
      
      //Loga como Admin
      if (codigo == 1) {
        router.replace('/coordenador/pacientes')
      }
      //Loga como Paciente
      else if (codigo == 2) {
        const { setUsuario } = usePacienteContext();
        setUsuario(new Paciente('2', 'Carlos Paciente', 2, 10, 0.1, '1', '2024-03-07', 1, 4, 2, 2, 3, 10.5, 5.5, true, 2, false, [], ['sf1']))
        router.replace('/pacientes/perfil')
      }
      else 
        setErro('Código ou senha incorreta!')
    } 
    // =========================================================================
    return (
      <LinearGradient
        colors={['#2af598', '#009efd']}
        style={styles.container}
      >
        {/* LOGO */}
        <Image source={require('./../../assets/imgs/logo.png')} style={styles.logo}/>

        {/* FORM */}
        <Formik
          initialValues={{codigo: '', senha: ''}}
          onSubmit={handleLogin} >
          {({handleChange, handleSubmit, isSubmitting}) => (
            <View style={styles.form}>
                <Text style={[styles.text, {textAlign: 'center', fontSize: 20}]}>Acesse</Text>
                <AppInput label="Código" onChangeText={handleChange('codigo')}/>
                <AppInput label="Senha" onChangeText={handleChange('senha')} password/>

                {erro && <Text style={styles.textError}>{erro}</Text>}

                <AppButton title="ACESSAR" onPress={handleSubmit} transparent color='white' disabled={isSubmitting} />
            </View>
          )}
        </Formik>

        {/* FOOTER */}
        <Text style={[styles.text, {fontSize: 20}]}>CESMAC</Text>
        <Text style={styles.text}>Centro de Inovação Tecnologia</Text>
        <Text style={styles.text}>Carlos W. Gama</Text>
          
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