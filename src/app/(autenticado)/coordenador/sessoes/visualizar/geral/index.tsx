import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { AppTemplateSessao } from '../components';
import { Formik } from 'formik';
import { useCoordenadorContext } from '../../../../../../contexts/coordenador-context';
import { AppButton, AppItemForm } from '../../../../../../templates/components';
import { AppColors } from '../../../../../../templates/colors';
import RadioGroup from 'react-native-radio-buttons-group';
import { SituacaoSessao } from '../../../../../../models/sessao';
import Toast from 'react-native-root-toast';
export interface SessoesGeralSecreenProps {
}

export default function SessoesGeralSecreen (props: SessoesGeralSecreenProps) {

    const { sessao } = useCoordenadorContext();
    // ========================================================================
    const handleSalvar = async (dados) => {
        await new Promise((resolve) => setTimeout(() => resolve(), 1000))
        console.log(dados);
        Toast.show('Salvo com sucesso!')
    }
    // ========================================================================
    return (
        <AppTemplateSessao title='Geral'>
            <View>
                <Text style={styles.title}>Pacientes presentes</Text>

                <Formik
                    initialValues={{pacientes: sessao.dadosPacientes}}
                    onSubmit={handleSalvar}>
                    {({values, handleSubmit, isSubmitting, setFieldValue}) => (
                        <>
                            <FlatList
                                data={values.pacientes}
                                renderItem={({item, index}) => (
                                    <>
                                        <AppItemForm label={item.nome}>
                                            <View style={{alignItems: 'flex-end', flex: 1, marginBottom: -10}}>
                                                <Switch value={values.pacientes[index].presente} thumbColor={(values.pacientes[index].presente ? AppColors.primary : AppColors.light)} onChange={() => {
                                                    setFieldValue(`pacientes.${index}.presente`, !values.pacientes[index].presente);
                                                }} />    
                                            </View>
                                        </AppItemForm>
                                        {values.pacientes[index].presente && <RadioGroup
                                            radioButtons={[
                                                {id: '1', label: 'Abstinente', value: SituacaoSessao.ABSTINENTE.toString() },
                                                {id: '2', label: 'Fumando', value: SituacaoSessao.FUMANDO.toString() },
                                                {id: '3', label: 'Manutenção', value: SituacaoSessao.MANUTENCAO.toString() },
                                            ]}
                                            selectedId={values.pacientes[index].situacao?.toString()}
                                            containerStyle={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}
                                            labelStyle={{fontSize: 12}}
                                            onPress={ (value) => setFieldValue(`pacientes.${index}.situacao`, value) }
                                        />}

                                    </>
                                )}/>

                            <AppButton title="Salvar" onPress={handleSubmit} disabled={isSubmitting} />
                        </>
                    )}
                </Formik>
            </View>
        </AppTemplateSessao>
    );
}


const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 22,
        color: '#989aa2',
        textAlign: 'center',
        margin: 10,
    }
});