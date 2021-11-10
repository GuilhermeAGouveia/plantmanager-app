import React, {useEffect, useState} from "react"
import { StyleSheet, Text, View, Image} from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import AsyncStorage from "@react-native-async-storage/async-storage"

import colors from "../styles/colors"
import fonts from "../styles/fonts"
import PerfilImg from "../assets/PerfilImg.jpg"

export function Header(){
    const [userName, setUserName] = useState<string>()

    useEffect(() => {
       async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(user || '')
       }
       loadStorageUserName()
    }, [userName])
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}> Olá,</Text>
                <Text style={styles.userName}> {userName} </Text>
            </View>
            <Image source={PerfilImg} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: getStatusBarHeight(),
        paddingVertical: 20
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontFamily: fonts.heading,
        fontSize: 32,
        color: colors.heading,
        lineHeight: 40
    },

})