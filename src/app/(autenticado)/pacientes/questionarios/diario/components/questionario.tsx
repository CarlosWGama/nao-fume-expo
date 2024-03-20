import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Questionario } from '../../../../../../models/questionario';
import { dataFormat } from '../../../../../../helpers/general';
import { Formik } from 'formik';
import { ButtonQuestionario } from './button';
import { AppButton, AppItemForm } from '../../../../../../templates/components';
import { router } from 'expo-router';
import { AppColors } from '../../../../../../templates/colors';
import * as Yup from 'yup';
import { TextInput } from 'react-native-gesture-handler';

export interface FormularioQuestionarioDiarioProps {
    dia: string;
    doAvancar(questionario: Questionario):any
}

function FormularioQuestionarioDiario ({ dia, doAvancar }: FormularioQuestionarioDiarioProps) {
    // ======================================================
    return (
      <View style={styles.container}>
         <Text style={styles.h1}>Questionario {dataFormat(dia)}</Text>
         <Formik
            initialValues={new Questionario(dia)}
            enableReinitialize
            validationSchema={Yup.object({
                fumou: Yup.boolean().required(),
                exercitou: Yup.boolean().required(),
                humor: Yup.number().required(),
                vontadeFumar: Yup.number().required(),
            })}
            onSubmit={async (dados, { resetForm  }) => {
                await doAvancar(dados)
                resetForm();
            }}
         >
            {({ values, isValid, setFieldValue, handleSubmit, isSubmitting }) => (
                <>
                    {/* FUMOU? */}
                    <Text style={styles.h2}>Fumou nesse dia?</Text>
                    <View style={styles.opcoes}>
                        <ButtonQuestionario 
                            title="Sim" 
                            image={require('./../../../../../../assets/imgs/icons/smoking.png')} 
                            selected={values.fumou != undefined && values.fumou}
                            onPress={() => setFieldValue('fumou', true) } />
                        <ButtonQuestionario 
                            title="Não" 
                            image={require('./../../../../../../assets/imgs/icons/not-smoking.png')} 
                            selected={values.fumou != undefined && !values.fumou}
                            onPress={() => setFieldValue('fumou', false)} />
                    </View>
                    {values.fumou && <AppItemForm label='Quantos cigarros?'>
                        <TextInput value={""+values.cigarros} onChangeText={(text) => {
                            if (!isNaN(parseInt(text)))
                                setFieldValue('cigarros', parseInt(text))
                        }} keyboardType='number-pad'/>
                    </AppItemForm>}

                    {/* EXERCICIO */}
                    <Text style={styles.h2}>Realizou algum exercício físico?</Text>
                    <View style={styles.opcoes}>
                        <ButtonQuestionario 
                            title="Sim" 
                            image={require('./../../../../../../assets/imgs/icons/exercise.png')} 
                            selected={values.exercitou != undefined && values.exercitou}
                            onPress={() => setFieldValue('exercitou', true)} />
                        <ButtonQuestionario 
                            title="Não" 
                            image={require('./../../../../../../assets/imgs/icons/tired.png')} 
                            selected={values.exercitou != undefined && !values.exercitou}
                            onPress={() => setFieldValue('exercitou', false)} />
                    </View>

                    {/* HUMOR */}
                    <Text style={styles.h2}>Como foi seu humor?</Text>
                    <View style={styles.opcoes}>
                        <ButtonQuestionario 
                            title="Baixo" 
                            image={require('./../../../../../../assets/imgs/icons/triste.png')} 
                            selected={values.humor == 0}
                            onPress={() => setFieldValue('humor', 0)} />

                        <ButtonQuestionario 
                            title="Normal" 
                            image={require('./../../../../../../assets/imgs/icons/normal.png')} 
                            selected={values.humor == 1}
                            onPress={() => setFieldValue('humor', 1)} />

                        <ButtonQuestionario 
                            title="Alto" 
                            image={require('./../../../../../../assets/imgs/icons/feliz.png')} 
                            selected={values.humor == 2}
                            onPress={() => setFieldValue('humor', 2)} />
                    </View>

                    {/* VONTADE */}
                    <Text style={styles.h2}>Como foi sua vontade de fuma?</Text>
                    <View style={styles.opcoes}>
                        <ButtonQuestionario 
                            title="Baixo" 
                            image={require('./../../../../../../assets/imgs/icons/feliz.png')} 
                            selected={values.vontadeFumar == 2}
                            onPress={() => setFieldValue('vontadeFumar', 2)} />

                        <ButtonQuestionario 
                            title="Normal" 
                            image={require('./../../../../../../assets/imgs/icons/normal.png')} 
                            selected={values.vontadeFumar == 1}
                            onPress={() => setFieldValue('vontadeFumar', 1)} />

                        <ButtonQuestionario 
                            title="Alto" 
                            image={require('./../../../../../../assets/imgs/icons/triste.png')} 
                            selected={values.vontadeFumar == 0}
                            onPress={() => setFieldValue('vontadeFumar', 0)} />
                    </View>

                    {/* SALVAR */}
                    <AppButton title='SALVAR' onPress={handleSubmit} disabled={!isValid} loading={isSubmitting} />
                    <Text style={{textAlign: 'center', fontSize: 20, margin: 10}}>OU</Text>
                    <AppButton title='RESPONDER MAIS TARDE' onPress={() => router.replace('/pacientes/perfil')} transparent textColor={AppColors.primary} />
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
        justifyContent: 'space-around'
    }
});
//========
export default React.memo(FormularioQuestionarioDiario);