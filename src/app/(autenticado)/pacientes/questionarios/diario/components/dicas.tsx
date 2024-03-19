import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AppButton } from '../../../../../../templates/components';
import { router } from 'expo-router';

export interface DicasProps {
}

function DicasQuestionario (props: DicasProps) {
    const dicas:{img:any, dica:string}[] = [
        {dica: 'Formigamento ou dormencia nos braços e pernas pode ser comum durante a abstinencia, isso ocorre por melhoramento na sua circulação sanguínea.', img: require('./../../../../../../assets/imgs/dicas/dormente.png')},
        {dica: 'Poderá ser comum sentir-se tonto nos primeiros dias. Isso ocorre porque seu cerebro está recebendo mais oxigêncio. Esses sintomas devem desaparecer com o tempo.', img: require('./../../../../../..//assets/imgs/dicas/tonto.jpg')},
        {dica: 'Será comum nos primeiros dias tossir mais do que quando fumava. Isso ocorre devido ao fato dos cílios estarem limpado os brônquios durante o dia.', img: require('./../../../../../..//assets/imgs/dicas/tosse.jpg')},
        {dica: 'Beba muitos copos de água durante o dia. Isso irá ajudar a diminuir o desejo pelo cigarro.', img: require('./../../../../../..//assets/imgs/dicas/agua.jpg')},
        {dica: 'Sempre carregue um lanche. Ter algo para mastigar, alivia a vontade de fumar.', img: require('./../../../../../..//assets/imgs/dicas/mastigar.jpg')},
        {dica: 'Fantasie: Para relaxar, sente-se em um local calmo com pernas cruzadas, conte até 10, esqueça o ambiente e pense em apenas deixar seu corpo relaxado.', img: require('./../../../../../..//assets/imgs/dicas/fantasie.jpg')},
        {dica: 'Realize exercícios de respiração profunda. Em pé, com os pés afastados e ligeiramente dobrados, puxe o ar lentamente pelo nariz. Prenda um pouco a respiração e o libere. Repita o processo 4 vezes', img: require('./../../../../../..//assets/imgs/dicas/respire.jpg')},
        {dica: 'Pratique atividades físicas com aumento gradual. Isso ajudará a diminuir o estress, mas lembre-se de procurar um médico antes.', img: require('./../../../../../..//assets/imgs/dicas/exercicio.jpg')},
        {dica: 'Relaxe o corpo e a mente, praticando atividades tranquilas', img: require('./../../../../../..//assets/imgs/dicas/relaxamento.jpg')},
        {dica: 'Seja positivo, use frases como "eu penso...", "eu acredito...", fale com as pessoas olhando nos olhos e com vontade e disposição', img: require('./../../../../../..//assets/imgs/dicas/positivo.jpg')},
        {dica: 'O apoio decimanentoso pode ser importante para você, solicite informações com seu coordenador de grupo', img: require('./../../../../../..//assets/imgs/dicas/medicamento.png')},
    ];
    // ================================================
    const random = () => {
        const min = Math.ceil(0);
        const max = Math.floor(dicas.length - 1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const index = random();
    // ================================================
    return (
      <View style={styles.container}>
         <Text style={styles.h1}>Dicas do dia!</Text>
         <Image source={dicas[index].img} s style={styles.img} />
         <Text style={styles.h2}>{dicas[index].dica}</Text>
         <AppButton title="Acessar APP" onPress={() => router.replace('/pacientes/perfil')} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        padding: 10
    }, 
    img: {
        height: 300,
        objectFit: 'contain',
        margin: 10
    },
    h1: {
        fontSize: 30,
        fontWeight: 'bold'
    }, 
    h2: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20
    }    
});

export default React.memo(DicasQuestionario)