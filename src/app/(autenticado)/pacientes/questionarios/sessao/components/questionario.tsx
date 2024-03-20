import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Questionario } from '../../../../../../models/questionario';
import { dataFormat } from '../../../../../../helpers/general';
import { Formik } from 'formik';
import { ButtonQuestionario } from './button';
import { AppButton, AppItemForm, AppLabel } from '../../../../../../templates/components';
import { router } from 'expo-router';
import { AppColors } from '../../../../../../templates/colors';
import * as Yup from 'yup';
import { TextInput } from 'react-native-gesture-handler';
import { Sessao } from '../../../../../../models/sessao';
import { useUsuariosService } from '../../../../../../services/usuarios.service';
import { usePacienteContext } from '../../../../../../contexts/paciente-context';

export interface FormularioQuestionarioDiarioProps {
    sessao: Sessao;
    doAvancar(questionario: Sessao):any
}

function FormularioQuestionarioSessao ({ sessao, doAvancar }: FormularioQuestionarioDiarioProps) {
    const  { usuario } = usePacienteContext();
    const [ index, setIndex ] = React.useState(0);
    React.useEffect(() => {
        setIndex(sessao.dadosPacientes.map(p => p.pacienteUID).indexOf(usuario?.uid));
    })

    // ======================================================
    return (
      <View style={styles.container}>
         <Text style={styles.h1}>Sessão {dataFormat(sessao.data)}</Text>
         <Formik
            initialValues={sessao}
            enableReinitialize
            validate={(values) => {
                const errors:any = {};
 
                if (!values.dadosPacientes[index].opiniao) {
                  errors.dadosPacientes[index].opiniao = 'Required';
                }
              
                return errors;
            }}
            onSubmit={async (dados, { resetForm  }) => {
                await doAvancar(dados)
                resetForm();
            }}
         >
            {({ values, isValid, setFieldValue, handleSubmit, isSubmitting }) => (
                <>
                    {/* PARTICIPOU? */}
                    {sessao.dadosPacientes[index].presente &&
                    <>
                        <View style={{alignItems:'center'}}><AppLabel text='PRESENTE' size={30} color={AppColors.success} /></View>
                        <Text style={{textAlign: 'center', fontSize: 20, margin: 10, color: 'grey'}}>O que achou da sessão?</Text>
                        
                        <View style={styles.opcoes}>
                            <ButtonQuestionario 
                                title="Chato" 
                                image={require('./../../../../../../assets/imgs/icons/chato.png')} 
                                selected={values.dadosPacientes[index].opiniao == 'chato'}
                                onPress={() => setFieldValue(`dadosPacientes.${index}.opiniao`, 'chato')} />
                            <ButtonQuestionario 
                                title="Desmotivante" 
                                image={require('./../../../../../../assets/imgs/icons/desmotivante.png')} 
                                selected={values.dadosPacientes[index].opiniao == 'desmotivante'}
                                onPress={() => setFieldValue(`dadosPacientes.${index}.opiniao`, 'desmotivante')} />
                            <ButtonQuestionario 
                                title="Interessante" 
                                image={require('./../../../../../../assets/imgs/icons/interessante.png')} 
                                selected={values.dadosPacientes[index].opiniao == 'interessante'}
                                onPress={() => setFieldValue(`dadosPacientes.${index}.opiniao`, 'interessante')} />
                            <ButtonQuestionario 
                                title="Empolgante" 
                                image={require('./../../../../../../assets/imgs/icons/empolgante.png')} 
                                selected={values.dadosPacientes[index].opiniao == 'empolgante'}
                                onPress={() => setFieldValue(`dadosPacientes.${index}.opiniao`, 'empolgante')} />
                        </View>
                    </>}
                  

                    {/* FALTOU? */}
                    {!sessao.dadosPacientes[index].presente &&
                    <>
                        <View style={{alignItems:'center'}}><AppLabel text='FALTOU' size={30} color={AppColors.danger} /></View>
                        <Text style={{textAlign: 'center', fontSize: 20, margin: 10, color: 'grey'}}>Por que faltou?</Text>

                        <View style={styles.opcoes}>
                            <ButtonQuestionario 
                                title="Doença" 
                                image={require('./../../../../../../assets/imgs/icons/sick.png')} 
                                selected={values.dadosPacientes[index].opiniao == 'doença'}
                                onPress={() => setFieldValue(`dadosPacientes.${index}.opiniao`, 'doença')} />
                            <ButtonQuestionario 
                                title="Desmotivado" 
                                image={require('./../../../../../../assets/imgs/icons/desmotivante.png')} 
                                selected={values.dadosPacientes[index].opiniao == 'desmotivado'}
                                onPress={() => setFieldValue(`dadosPacientes.${index}.opiniao`, 'desmotivado')} />
                            <ButtonQuestionario 
                                title="Outros motivos" 
                                image={require('./../../../../../../assets/imgs/icons/shrug.png')} 
                                selected={values.dadosPacientes[index].opiniao == 'outros motivos'}
                                onPress={() => setFieldValue(`dadosPacientes.${index}.opiniao`, 'outros motivos')} />
                            <ButtonQuestionario 
                                title="Não Informar" 
                                image={require('./../../../../../../assets/imgs/icons/nao-informar.png')} 
                                selected={values.dadosPacientes[index].opiniao == 'não informar'}
                                onPress={() => setFieldValue(`dadosPacientes.${index}.opiniao`, 'não informar')} />
                        </View>
                    </>}

              
                    {/* SALVAR */}
                    <AppButton title='SALVAR' onPress={handleSubmit} disabled={!isValid} loading={isSubmitting} />
                </>
            )}
         </Formik>
      </View>
    );
}
// =======
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    }, 
    h1: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }, 
    h2: {
        textAlign: 'center',
        fontSize: 20,
        color: 'grey',
        marginVertical: 5
    },
    opcoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
});
//========
export default React.memo(FormularioQuestionarioSessao);