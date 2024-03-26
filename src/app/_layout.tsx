import { Stack } from "expo-router";
import { CoordenadorProvider } from "./../contexts/coordenador-context";
import { AppColors } from "../templates/colors";
import { RootSiblingParent } from 'react-native-root-siblings';
import { PacienteProvider } from "../contexts/paciente-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function LayoutInicial () {
    
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <RootSiblingParent>
                    <CoordenadorProvider>
                        <PacienteProvider>
                            <Stack screenOptions={{headerShown: false, animation: "none"}} />
                                
                        </PacienteProvider>
                    </CoordenadorProvider>
            </RootSiblingParent>
        </GestureHandlerRootView>
    );
}
