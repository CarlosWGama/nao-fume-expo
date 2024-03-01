import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface CardButtonProps {
    title: string,
    icon: string,
    onPress():void;
}
// ===========
function CardButton ({title, icon, onPress}: CardButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={{flex: 1}}>
            <View style={styles.container}>
                <Ionicons name={icon} color="white" size={18}/>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}
// ============
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 5,
        margin: 2
    },
    text: {
        color: 'white',
        marginHorizontal: 5
    }
});
// =============
export default React.memo(CardButton)