import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppColors } from '../colors';
import { Ionicons } from '@expo/vector-icons';

export interface AppButtonProps {
    color?:string;
    textColor?: string;
    transparent?: boolean;
    title: string;
    onPress():void;
    disabled?: boolean;
    loading?: boolean;
    icon?: string
}

function AppButton ({color = AppColors.primary, transparent, title, onPress, textColor = 'white', disabled, loading, icon}: AppButtonProps) {
    return (
        <TouchableOpacity onPress={disabled || loading ? () => {} : onPress}>
            <View style={[styles.container, 
                {
                    backgroundColor: (transparent ? 'transparent' : color),
                    elevation: (transparent ? 0 : 1),
                    opacity: ( disabled || loading? 0.4 : 1),
                    borderColor: color}
                ]}>
                { icon && <Ionicons name={icon} color={color} />}
                { !loading && <Text style={{fontSize: 16, color:textColor}}>{title}</Text> }
                { loading && <ActivityIndicator color={textColor} size={16} />}
            </View>
        </TouchableOpacity>
    );
}
// =======
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 2
    },
    text: {
        
    }
});
// =======
export default React.memo(AppButton)