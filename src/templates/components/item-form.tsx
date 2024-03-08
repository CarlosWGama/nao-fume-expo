import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../colors';

export interface AppItemFormProps {
    children: any,
    error?: any,
    label: string,
}
// ======
function AppItemForm ({children, error, label}: AppItemFormProps) {
    return (
        <View style={[styles.container, {backgroundColor: (error ? AppColors.danger : 'white')}]}>
            <Text>{label}: </Text>
            {children}
        </View>
    );
}
// ======
const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: AppColors.lightgrey
    },
});
// ========
export default React.memo(AppItemForm)