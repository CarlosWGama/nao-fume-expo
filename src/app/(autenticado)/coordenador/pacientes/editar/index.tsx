import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { AppButton, AppHeader, AppItemForm } from '../../../../../templates/components';
import { useCoordenadorContext } from '../../../../../contexts/coordenador-context';
import { AppColors } from '../../../../../templates/colors';
import { Formik } from 'formik';
import { Paciente } from '../../../../../models/paciente';
import MaskInput, { Masks, createNumberMask } from 'react-native-mask-input';
import { dataFormat } from '../../../../../helpers/general';
import Toast from 'react-native-root-toast';
import * as Yup from 'yup';
import { usePacientesService } from '../../../../../services/pacientes.service';
import { router } from 'expo-router';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { TouchableOpacity } from 'react-native-gesture-handler';


export interface PacienteEditarScreenProps {
}

export default function PacienteEditarScreen (props: PacienteEditarScreenProps) {

    const { paciente } = useCoordenadorContext();
    
    const pacientesSrv = usePacientesService();
    // ==============================================================
    const handleSalvar = async (dados: Paciente) => {
      console.log(dados)
      if (!dados.uid) {
        const retorno = await pacientesSrv.cadastrar(dados);
        if (retorno.sucesso) {
          Toast.show(`Paciente de código ${retorno.codigo} atualizado com sucesso`);
          router.back();
        } else {
          Toast.show('Não foi possível completar a operação');
        }

      } 
      else {
        const retorno = await pacientesSrv.atualizar(dados);
        if (retorno.sucesso)
          Toast.show('Paciente atualizado com sucesso!')
        else 
          Toast.show('Não foi possível completar a operação');
      } 

      
      
    }
    // ==============================================================
    return (
      <View style={{flex:1}}>
        <AppHeader title={paciente ? 'Editar Paciente' : 'Cadastrar Paciente'} back/>

        <Formik
          initialValues={paciente ? paciente : new Paciente()}
          validationSchema={Yup.object({
            nome: Yup.string().required('Campo obrigatório'),
            senha: Yup.string().min(6, 'Ter pelo menos 6 caracteres'),
            ultimoDiaRespondido: Yup.string().length(10).required(),
            mediaCigarros: Yup.number().required('Obrigatório'),
            precoCigarro: Yup.number().required('Obrigatório'),
          })}
          onSubmit={handleSalvar}
        >
          {({handleSubmit, values, handleChange, setFieldValue, errors, isValid, isSubmitting, touched, handleBlur}) => (
            <>  
              {/* NOME */}
              <AppItemForm label="Nome" error={errors.nome && touched.nome}>
                <TextInput 
                  style={{flex:1, marginLeft: 10}} placeholder='Nome'
                  value={values.nome}  
                  onBlur={handleBlur('nome')}
                  onChangeText={handleChange('nome')}/>
              </AppItemForm>

              {/* SENHA */}
              <AppItemForm label="Senha" error={errors.senha && touched.senha}>
                <TextInput 
                  style={{flex:1, marginLeft: 10}}
                  placeholder='Senha' secureTextEntry
                  value={values.senha} 
                  onBlur={handleBlur('senha')}
                  onChangeText={handleChange('senha')} 
                  />
              </AppItemForm>

              {/* GENERO */}
              <AppItemForm label="Genero">
                  <RadioGroup
                      radioButtons={[
                          {id: 'M', label: 'Masculino', value: 'M' },
                          {id: 'F', label: 'Feminino', value: 'F' },
                      ]}
                      selectedId={values.genero}
                      containerStyle={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}
                      labelStyle={{fontSize: 12}}
                      onPress={handleChange('genero')} />
              </AppItemForm>
              
              {/* PROXIMO QUESTIONARIO DIARIO */}
              <AppItemForm label="Último questionário diário respondido" error={errors.ultimoDiaRespondido && touched.ultimoDiaRespondido}>
                <MaskInput style={{flex:1, marginLeft: 10}} 
                  value={dataFormat(""+values.ultimoDiaRespondido)}  
                  onChangeText={(text) => {
                    setFieldValue('ultimoDiaRespondido',dataFormat(text, 'br-to-database'))
                  }} 
                  onBlur={handleBlur('ultimoDiaRespondido')}
                  placeholder='Dia/Mês/Ano' 
                  keyboardType='decimal-pad'
                  mask={Masks.DATE_DDMMYYYY	}/>
                  <Button title="X" onPress={() => setFieldValue('ultimoDiaRespondido', '')} />
              </AppItemForm>

              {/* CIGARROS */}
              <AppItemForm label="Cigarros por dia" error={errors.mediaCigarros && touched.mediaCigarros}>
                <MaskInput style={{flex:1, marginLeft: 10}} 
                  value={""+values.mediaCigarros}  
                  onChangeText={handleChange('mediaCigarros')} 
                  placeholder='Quantidade' 
                  onBlur={handleBlur('mediaCigarros')}
                  keyboardType='decimal-pad'/>
              </AppItemForm>

              {/* PREÇO CIGARRO */}
              <AppItemForm label="Preço do cigarro" error={errors.precoCigarro && touched.precoCigarro}>
                <MaskInput style={{flex:1, marginLeft: 10}} 
                  value={""+Number(values.precoCigarro).toFixed(2)}  
                  onChangeText={handleChange('precoCigarro')} 
                  onBlur={handleBlur('precoCigarro')}
                  placeholder='Valor em reais' 
                  keyboardType='decimal-pad'
                  mask={createNumberMask({precision: 2, separator: '.', delimiter: ''})	}/>
                  <Button title="X" onPress={() => setFieldValue('precoCigarro', '0')} />
              </AppItemForm>
              
              
              <AppButton onPress={handleSubmit} title='SALVAR' color={AppColors.success} disabled={!isValid} loading={isSubmitting}/>
            </>
          )}
        </Formik>
      </View>
    );
}