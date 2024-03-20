import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { AppButton, AppItemForm } from '../../../../../templates/components';
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


export interface PacienteEditarScreenProps {
}

export default function PacienteEditarScreen (props: PacienteEditarScreenProps) {

    const { paciente } = useCoordenadorContext();
    const pacientesSrv = usePacientesService();
    // ==============================================================
    const handleSalvar = async (dados: Paciente) => {
      
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
              
              {/* PROXIMO QUESTIONARIO DIARIO */}
              <AppItemForm label="Próximo questionário diário" error={errors.ultimoDiaRespondido && touched.ultimoDiaRespondido}>
                <MaskInput style={{flex:1, marginLeft: 10}} 
                  value={dataFormat(""+values.ultimoDiaRespondido)}  
                  onChangeText={(text) => {
                    setFieldValue('ultimoDiaRespondido',dataFormat(text, 'br-to-database'))
                  }} 
                  onBlur={handleBlur('ultimoDiaRespondido')}
                  placeholder='Dia/Mês/Ano' 
                  keyboardType='decimal-pad'
                  mask={Masks.DATE_DDMMYYYY	}/>
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
                  value={""+values.precoCigarro.toFixed(2)}  
                  onChangeText={handleChange('precoCigarro')} 
                  onBlur={handleBlur('precoCigarro')}
                  placeholder='Valor em reais' 
                  keyboardType='decimal-pad'
                  mask={createNumberMask({precision: 2, separator: '.'})	}/>
              </AppItemForm>
              
              
              <AppButton onPress={handleSubmit} title='SALVAR' color={AppColors.success} disabled={!isValid} loading={isSubmitting}/>
            </>
          )}
        </Formik>
      </View>
    );
}