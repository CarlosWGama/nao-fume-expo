import { Stack } from "expo-router";
import { CoordenadorProvider } from "./../contexts/coordenador-context";

export default function LayoutCoordenador () {
    return (
        <CoordenadorProvider>
            <Stack screenOptions={{headerShown: false, animation: "none"}}/>
        </CoordenadorProvider>
    );
}
