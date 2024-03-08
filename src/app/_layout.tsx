import { Stack } from "expo-router";
import { CoordenadorProvider } from "./../contexts/coordenador-context";
import { AppColors } from "../templates/colors";
import { RootSiblingParent } from 'react-native-root-siblings';
import { PacienteProvider } from "../contexts/paciente-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function LayoutCoordenador () {
    return (
            <GestureHandlerRootView style={{flex: 1}}>
        <RootSiblingParent>
                <CoordenadorProvider>
                    <PacienteProvider>
                        <Stack screenOptions={{headerShown: false, animation: "none"}}>
                            <Stack.Screen name="(autenticado)/coordenador/pacientes/editar/index" options={{
                                headerShown: true,
                                headerStyle: {backgroundColor: AppColors.primary},
                                headerTintColor: 'white',
                                title: 'Paciente'
                            }} />

                            <Stack.Screen name="(autenticado)/coordenador/sessoes/editar/index" options={{
                                headerShown: true,
                                headerStyle: {backgroundColor: AppColors.primary},
                                headerTintColor: 'white',
                                title: 'Sessão'
                            }} />


                            <Stack.Screen name="(autenticado)/pacientes/(tabs)/perfil/editar/index" options={{
                                headerShown: true,
                                headerStyle: {backgroundColor: AppColors.warning},
                                headerTintColor: 'white',
                                title: 'Editando Conta'
                            }} />
                        </Stack>
                    </PacienteProvider>
                </CoordenadorProvider>
        </RootSiblingParent>
            </GestureHandlerRootView>
    );
}
