import React from "react"
import {SafeAreaView, StyleSheet, View, Text} from "react-native"
import Button from "../components/Button"
import colors from "../styles/colors"
import fonts from "../styles/fonts"
import { useNavigation, useRoute } from "@react-navigation/native"
interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😄'
}

export function Confirmation(){
    const navigation = useNavigation()
    const routes = useRoute()
    const {
        title,
        subtitle,
        icon,
        buttonTitle,
        nextScreen
    } = routes.params as Params
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            </View>
            <View style={styles.footer}>
                <Button text={buttonTitle} onPress={() => navigation.navigate(nextScreen)}></Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        
        alignItems: "center",
        justifyContent: "center",
     
     
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: "center",
        color: colors.heading,
        marginTop: 15,
        lineHeight: 38,
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: "center",
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
        padding: 20
    },
    emoji: {
        textAlign: "center",
        fontSize: 78,
    },

    footer:{
        width: "100%",
        marginTop: 20,
        paddingHorizontal: 75,
        
    }
})