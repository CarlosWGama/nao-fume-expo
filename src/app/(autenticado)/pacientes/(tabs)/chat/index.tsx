import * as React from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import PacienteTemplate from '../../../../../templates/template-paciente';
import { Mensagem } from '../../../../../models/mensagem';
import { useMensagensService } from '../../../../../services/mensagens.service';
import { ItemMensagem } from './components';
import { AppColors } from '../../../../../templates/colors';
import { Ionicons } from '@expo/vector-icons'


export default function ChatScreen () {

    const [ mensagens, setMensagens ] = React.useState<Mensagem[]>([]);
    const [ mensagem, setMensagem ] = React.useState("");
    const flatlistRef = React.useRef<FlatList>(null);
    const mensagensService = useMensagensService();
    // ==================================================================
    const buscarMensagens = async () => {
        setMensagens( await mensagensService.buscarMensagens())
    }
    // ------
    const handleEnviar = async () => {
        mensagensService.enviar('autor_id', mensagem);
        setMensagem("");
        Keyboard.dismiss();
        flatlistRef.current?.scrollToEnd();
    }
    // ------
    React.useEffect(() => {
        buscarMensagens()
    }, [])
    // ==================================================================
    return (
        <PacienteTemplate title="Chat">
            {/* MENSAGENS */}
            <View style={{flex: 1, backgroundColor: AppColors.primary, paddingHorizontal: 10}}>
                <FlatList 
                        ref={flatlistRef}
                        data={mensagens}
                        renderItem={({item, index}) => (
                            <ItemMensagem mensagem={item} autor={item.pacienteUID == 'aaa'} />
                        )}/>
            </View>

            {/* INPUT */}
            <View style={styles.containerInput}>
                <TextInput value={mensagem} onChangeText={setMensagem} multiline style={{flex: 1, padding:5}} blurOnSubmit placeholder='Digite sua mensagem'/>
                <TouchableOpacity onPress={handleEnviar}>                    
                    <Ionicons name="send" color={AppColors.primary} style={styles.send}/>
                </TouchableOpacity>
            </View>
        </PacienteTemplate>
    );
}

const styles = StyleSheet.create({
    containerInput: {
        backgroundColor:'white',
        flexDirection: 'row'
    },
    send: {
        margin: 10,
        fontSize: 20
    }
});