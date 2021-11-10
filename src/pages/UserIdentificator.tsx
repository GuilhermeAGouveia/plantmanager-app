import React, { useState } from "react"
import {SafeAreaView, StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform, Touchable, Keyboard, Alert} from "react-native"
import colors from "../styles/colors"
import fonts from "../styles/fonts"
import Button from "../components/Button"
import { useNavigation } from "@react-navigation/native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import AsyncStorage from '@react-native-async-storage/async-storage'

export function UserIdentificator(){
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    function handleInputBlur(){
        setIsFocused(false)
    }
    function handleInputFocus(){
        setIsFocused(true)
    }
    function handleInputChange(value: string){
        setIsFilled(!!value)
        setName(value)
    }

    async function handleSubmit(){
        if (!name) 
            return Alert.alert("Me diz como chamar você")
        
        try {
            await AsyncStorage.setItem('@plantmanager:user', name)
            navigation.navigate("Confirmation",{
                title: 'Prontinho',
                icon: 'smile',
                subtitle: 'Agoras vamos começar a cuidar de suas plantinhas com muito cuidado',
                buttonTitle: 'Começar',
                nextScreen: 'PlantSelect'
            })
        } catch {
            Alert.alert("Não foi possivel salvar seu nome")
        }
       
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            
                            <Text style={styles.emoji}>
                                {!isFilled ? "😃" : "😄" }
                            </Text>
                            <Text style={styles.tittle}>
                                Como podemos {'\n'} chamar você?
                            </Text>
                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {borderColor: colors.green}
                                ]} 
                                placeholder={"Digite seu nome"}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button text={"Confirmar"} onPress={handleSubmit}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
    },
    content: {
        flex: 1,
        width: "100%",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 54
    },
    emoji: {
        fontSize: 40,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        width: "100%",
        color: colors.heading,
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: "center",
    },
    tittle: {
        fontSize: 24,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20,
    },
    footer: {
        marginTop: 40,
        width: "90%",
    }
})