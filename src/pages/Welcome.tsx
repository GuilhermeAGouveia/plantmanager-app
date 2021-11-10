import React, { useState } from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native'
import wateringImg from "../assets/watering.png"
import colors from "../styles/colors"
import fonts from "../styles/fonts"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';

export function Welcome() {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.tittle}>
                Gerencie {'\n'}
                suas plantas de {'\n'}
                forma fácil
            </Text>
            <Image source={wateringImg} style={styles.image} resizeMode={"contain"} />
            <Text style={styles.subtittle}>
                Não esqueça mais de regar suas {"\n"} plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate("UserIdentificator")}>
                <Feather name={"chevron-right"} size={32} color={colors.white} />

            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tittle: {
        marginTop: 38,
        fontSize: 32,
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 34
    },
    subtittle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 40,
        color: colors.heading,
        fontFamily: fonts.text

    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        width: 56,
        height: 56,
    },
    image: {

        height: Dimensions.get('window').width * 0.7,
    }
});