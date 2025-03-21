import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../colors';
import AppBackButton from './back-button';

export interface AppHeaderProps {
    backgroundColor?: string;
    color: string;
    title: string;
    back?: boolean
}

export function AppHeader ({backgroundColor = AppColors.primary, title, back, color = 'white'}: AppHeaderProps) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
         {back && <AppBackButton />}
         <Text style={[styles.text, {color}]}>{title}</Text>
      </View>
    );
}

export default React.memo(AppHeader)

const styles = StyleSheet.create({
    container: {
        elevation: 20,
        padding: 15,
        paddingTop: 40,
        flexDirection: 'row'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    }
});
