import * as React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AppTemplateSessao } from '../components';
import { useCoordenadorContext } from '../../../../../../contexts/coordenador-context';
import { AppLabel } from '../../../../../../templates/components';
import { AppColors } from '../../../../../../templates/colors';

export interface SessoesRespostaslSecreenProps {
}

export default function SessoesRespostasSecreen (props: SessoesRespostaslSecreenProps) {
    const { sessao } = useCoordenadorContext();
    // ========================================================================
    return (
        <AppTemplateSessao title='Respostas'>
            
            <View>
                <FlatList 
                    data={sessao?.dadosPacientes}
                    renderItem={({item}) => (
                        <View style={styles.card}>
                            {/* PRESENÇA */}
                            {item.presente && <AppLabel text='Presente' color={AppColors.success} textColor='white' size={10} />}
                            {!item.presente && <AppLabel text='Faltou' color={AppColors.danger}  textColor='white' size={10} />}

                            {/* NOME */}
                            <Text style={styles.textPaciente}>{item.nome}</Text>

                            {/* FEEDBACK */}
                            {item.presente && <Text>Feedback da reunião:</Text>}
                            {!item.presente && <Text>Motivo da falta:</Text>}

                            <Text style={{paddingHorizontal: 10}}>{item.opiniao ? item.opiniao : 'Nada Informado' }</Text>

                        </View>
                    )}
                />
            </View>
        </AppTemplateSessao>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: AppColors.lightgrey,
        margin: 5,
        padding: 10, 
        alignItems: 'baseline',
        borderRadius: 3,
    },

    textPaciente: {
        fontSize: 18,
        textTransform: 'uppercase',
        marginVertical: 5
    }
});
