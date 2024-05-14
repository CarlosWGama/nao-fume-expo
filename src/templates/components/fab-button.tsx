
import { memo } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from '../colors';

export interface AppFabButtonProps {
    icon?: string
    color?: string,
    position?: 'top-left'|'top-right'|'bottom-left'|'bottom-right'
    onPress():void
}

export function AppFabButton ({icon = 'add', color = AppColors.primary, position = 'top-right', onPress}: AppFabButtonProps) {

    let positionFab;
    if (position == 'top-left') positionFab = {top: 5, left: 5}
    else if (position == 'top-right') positionFab = {top: 5, right: 5}
    else if (position == 'bottom-left') positionFab = { bottom: 5, left: 20}
    else positionFab = {bottom: 5, right: 10}
    // ===========================================
    return (
        <View style={{position: 'absolute', ...positionFab}}>
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.container, { backgroundColor: color }]}>
                    <MaterialIcons name={icon} size={40} color="white"/>
                </View>
            </TouchableOpacity>
        </View>
    );
}
// =======
const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    }
});
// =======
export default memo(AppFabButton)