import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { AppTemplateSessao } from '../components';
import { Formik } from 'formik';
import { useCoordenadorContext } from '../../../../../../contexts/coordenador-context';
import { AppButton, AppItemForm } from '../../../../../../templates/components';
import { AppColors } from '../../../../../../templates/colors';
import RadioGroup from 'react-native-radio-buttons-group';
import { DadosPacientesSessao, Sessao, SituacaoSessao } from '../../../../../../models/sessao';
import Toast from 'react-native-root-toast';
import { useSessoesService } from '../../../../../../services/sessoes.service';
import { usePacientesService } from '../../../../../../services/pacientes.service';
export interface SessoesGeralSecreenProps {
}

export default function SessoesGeralSecreen (props: SessoesGeralSecreenProps) {

    const { sessao, setSessao } = useCoordenadorContext();
    const sessoesSrv = useSessoesService();
    const pacientesSrv = usePacientesService();
    // ========================================================================
    const handleSalvar = async ({pacientes}: {pacientes: DadosPacientesSessao[]}) => {
        sessao.dadosPacientes = pacientes;
        setSessao({...sessao});
        const retorno = await sessoesSrv.atualizar(sessao);
        if (retorno.sucesso)
            Toast.show('Salvo com sucesso!')
        else
            Toast.show('Não foi concluir a operação')
    }
    // -----------
    const buscarPacientes = async () => {
        const pacientes = await pacientesSrv.buscarPacientes();

        const dadosPacientesIDs = sessao?.dadosPacientes.map(dados => dados.pacienteUID)

        //Adiciona os pacientes que não estão na lista
        pacientes.forEach(p => {
            if (!dadosPacientesIDs?.includes(p.uid)) {
                sessao.dadosPacientes.push(new DadosPacientesSessao(p.uid, false, p.nome))
            }
        })

        setSessao({...sessao})

    }
    // ----------
    React.useEffect(() => {
        buscarPacientes()
    }, []);
    // ========================================================================
    return (
        <AppTemplateSessao title='Geral'>
            <View>
                <Text style={styles.title}>Pacientes presentes {sessao?.dadosPacientes.length}</Text>

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
                                            <View style={{alignItems: 'flex-end', flex: 1}}>
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