import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../colors';

export interface AppButtonProps {
    color?:string;
    textColor?: string;
    transparent?: boolean;
    title: string;
    onPress():void;
    disabled?: boolean
}

export default function AppButton ({color, transparent, title, onPress, textColor, disabled}: AppButtonProps) {
    return (
        <TouchableOpacity onPress={disabled ? () => {} : onPress}>
            <View style={[styles.container, 
                {
                    backgroundColor: (disabled ? 'lightgrey' : (transparent ? 'transparent' : color)), 
                    borderColor: color}
                ]}>
                <Text style={{color:textColor}}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

AppButton.defaultProps = {
    textColor: 'white',
    color: AppColors.primary,
}


const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1
    },
    text: {

    }
});