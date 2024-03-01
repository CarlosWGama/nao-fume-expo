import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../colors';

export interface AppLabelProps {
    text: string,
    color?: string,
    size?: number,
    textColor?: string
}

function AppLabel ({text, color, size, textColor}: AppLabelProps) {
    return (
         <Text style={[styles.label, {backgroundColor: color, fontSize: size, color: textColor, fontWeight: 'bold'}]}>{text}</Text>
    );
}
// =======
AppLabel.defaultProps = {
    color: AppColors.primary,
    size: 14,
    textColor: 'white'
}
// =======
const styles = StyleSheet.create({
    label: {
        marginHorizontal: 10,
        padding: 2,
        borderRadius: 3,
    }
});

export default React.memo(AppLabel)