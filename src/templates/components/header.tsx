import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../colors';
import { AppBackButton } from '.';

export interface AppHeaderProps {
    backgroundColor?: string;
    color: string;
    title: string;
    back?: boolean
}

export function AppHeader ({backgroundColor, title, back, color}: AppHeaderProps) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
         {back && <AppBackButton />}
         <Text style={[styles.text, {color}]}>{title}</Text>
      </View>
    );
}

AppHeader.defaultProps = {
    backgroundColor: AppColors.primary,
    color: 'white'
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
