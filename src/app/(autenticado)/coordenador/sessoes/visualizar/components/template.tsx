import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../../../../../templates/colors';
import { AppBackButton, AppHeaderButton } from '../../../../../../templates/components';

export interface AppTemplateSessaoProps {
    title: 'Geral'|'Respostas'
    children: any,
}

function AppTemplateSessao ({children, title}: AppTemplateSessaoProps) {
    return (
      <View style={{flex:1}}>
            {/* HEADER */}
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                    <AppBackButton />
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 5}}>
                    <AppHeaderButton icon='newspaper' title='Geral' page='/coordenador/sessoes/visualizar/geral' selecionado={title == 'Geral'} />
                    <AppHeaderButton icon='thumbs-up' title='Respostas' page='/coordenador/sessoes/visualizar/respostas'  selecionado={title == 'Respostas'} />
                </View>
            </View>
            
            {/* MAIN */}
            <View style={{backgroundColor: 'white', flex: 1}}>
                {children}
            </View>
      </View>
    );
}
// ===========
const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.primary,
        paddingTop: 45,
        paddingHorizontal: 10
    },
    title: {
        color:'white',
        fontSize: 20,
        marginLeft: 10
    }
});

// ===========
export default React.memo(AppTemplateSessao)