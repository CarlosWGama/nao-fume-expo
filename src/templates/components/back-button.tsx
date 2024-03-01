import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { router } from 'expo-router';


export interface AppBackButtonProps {
}

function AppBackButton (props: AppBackButtonProps) {

    return (
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" color="white" size={20} />
        </TouchableOpacity>
    );
}

export default memo(AppBackButton);
