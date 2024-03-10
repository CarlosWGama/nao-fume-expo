import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface ButtonQuestionarioProps {
    title: string;
    image: any;
    selected?: false;
    onPress: any;
}

export function ButtonQuestionario ({ title, image, selected, onPress }: ButtonQuestionarioProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, {backgroundColor: (selected ? '#ffa07a' : 'white')}]}>
                <Text style={styles.title}>{title}</Text>
                <Image source={image} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        width: 90,
        height: 90,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5
    },
    title: {
        fontSize: 16,
    },
    image: {
        width: 50,
        height: 50
    }
});