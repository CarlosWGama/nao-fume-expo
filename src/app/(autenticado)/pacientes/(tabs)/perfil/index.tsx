import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';
import { AppColors } from '../../../../../templates/colors';

export interface PerfilScreenProps {
}

export default function PerfilScreen (props: PerfilScreenProps) {
    return (
      <PacienteTemplate title="Perfil" color={AppColors.warning}>
          <ImageBackground source={require('./../../../../../assets/imgs/bg-paciente-perfil.jpg')} style={styles.container}>
        <Text>AAAAA</Text>

          </ImageBackground>
      </PacienteTemplate>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
