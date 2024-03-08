import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../colors';
import { Ionicons } from '@expo/vector-icons';

export interface AppButtonProps {
    color?:string;
    textColor?: string;
    transparent?: boolean;
    title: string;
    onPress():void;
    disabled?: boolean;
    icon?: string
}

function AppButton ({color, transparent, title, onPress, textColor, disabled, icon}: AppButtonProps) {
    return (
        <TouchableOpacity onPress={disabled ? () => {} : onPress}>
            <View style={[styles.container, 
                {
                    backgroundColor: (transparent ? 'transparent' : color),
                    opacity: ( disabled? 0.4 : 1),
                    borderColor: color}
                ]}>
                { icon && <Ionicons name={icon} color={color} />}
                <Text style={{color:textColor}}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}
// =======
AppButton.defaultProps = {
    textColor: 'white',
    color: AppColors.primary,
}
// =======
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 2
    },
    text: {
        
    }
});
// =======
export default React.memo(AppButton)