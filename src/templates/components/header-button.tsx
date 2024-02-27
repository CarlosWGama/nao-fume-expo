import * as React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export interface AppHeaderButtonProps {
    icon: string,
    title: string,
    page: string
}

export function AppHeaderButton ({icon, title, page}: AppHeaderButtonProps) {
    return (
      <View>
            <Ionicons name={icon} color='white' />
            <Text>{title}</Text>
      </View>
    );
}
