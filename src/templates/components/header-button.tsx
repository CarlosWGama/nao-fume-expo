import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


export interface AppHeaderButtonProps {
    icon: string,
    title: string,
    page: string,
    selecionado?: boolean
}

export function AppHeaderButton ({icon, title, page, selecionado}: AppHeaderButtonProps) {

    // =======================================================
    const changePage = async () => {
      router.replace(page)
    }
    // =======================================================
    return (
      <TouchableOpacity onPress={changePage}>
        <View style={styles.container}>
              <Ionicons name={icon + (selecionado ? '' : '-outline')} color='white' />
              <Text style={{color: 'white', fontWeight: (selecionado ? 'bold' : '400')}}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 20
  }
});
