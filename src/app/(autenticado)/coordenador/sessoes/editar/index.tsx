import * as React from 'react';
import { View } from 'react-native';
import { AppButton, AppItemForm } from '../../../../../templates/components';
import { useCoordenadorContext } from '../../../../../contexts/coordenador-context';
import { AppColors } from '../../../../../templates/colors';
import { Formik } from 'formik';
import { Sessao } from '../../../../../models/sessao';
import MaskInput, { Masks } from 'react-native-mask-input';
import { dataFormat } from '../../../../../helpers/general';
import Toast from 'react-native-root-toast';
import * as Yup from 'yup';
import { router } from 'expo-router';
import { useSessoesService } from '../../../../../services/sessoes.service';


export interface SessaoEditarScreenProps {
}

export default function SessaoEditarScreen (props: SessaoEditarScreenProps) {

    const { sessao } = useCoordenadorContext();
    const sessoesSrv = useSessoesService();
    // ==============================================================
    const handleSalvar = async (sessao: Sessao) => {
      
      let retorno = { sucesso: false };
      
      if (!sessao.id)  retorno = await sessoesSrv.cadastrar(sessao);
      else retorno = await sessoesSrv.atualizar(sessao);

      if (retorno.sucesso) {
        Toast.show('Sessao salvo com sucesso!')
        router.back();
      } else {
        Toast.show('Não foi possível realizar a operação');
      }
    }
    // ==============================================================
    return (
      <View style={{flex:1}}>
        <Formik
          initialValues={sessao ? sessao : new Sessao()}
          validationSchema={Yup.object({ data: Yup.string().length(10).required() })}
          onSubmit={handleSalvar} >
          {({handleSubmit, values, setFieldValue, errors, isValid, touched, handleBlur}) => (
            <>  
              {/* PROXIMO QUESTIONARIO DIARIO */}
              <AppItemForm label="Data da sessão" error={errors.data && touched.data}>
                <MaskInput style={{flex:1, marginLeft: 10}} 
                  value={dataFormat(""+values.data)}  
                  onChangeText={(text) => {
                    setFieldValue('data',dataFormat(text, 'br-to-database'))
                  }} 
                  onBlur={handleBlur('data')}
                  placeholder='Dia/Mês/Ano' 
                  keyboardType='decimal-pad'
                  mask={Masks.DATE_DDMMYYYY	}/>
              </AppItemForm>   
              
              <AppButton onPress={handleSubmit} title='SALVAR' color={AppColors.success} disabled={!isValid}/>
            </>
          )}
        </Formik>
      </View>
    );
}