import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, FlatList, Alert, AsyncStorage } from "react-native"
import { Header } from '../components/Header'
import colors from '../styles/colors'
import WaterDrop from "../assets/waterdrop.png"
import { loadPlant, removePlant } from '../libs/storage'
import { Load } from "../components/Load"
import { formatDistance } from 'date-fns/esm'
import { ptBR } from 'date-fns/locale'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { PlantProps } from "../libs/storage"

export function MyPlants() {
    const [loading, setLoading] = useState(true)
    const [nextWatered, setNextWatered] = useState<string>()
    const [myPlants, setMyPlants] = useState<PlantProps[]>([])

    function handleRemove(plant: PlantProps){
        Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 🙃',
                onPress: async () => {
                    try {
                        await removePlant(plant.id)
                        setMyPlants(oldData => 
                            oldData.filter(item => item.id != plant.id)
                        )

                    } catch (error) {
                        Alert.alert("Não foi possível remover!")
                    }
                }
            }
        ])
    }
    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();
            if (!plantsStoraged) return setLoading(false);
            console.log(plantsStoraged)
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {
                    locale: ptBR
                }
            )

            setNextWatered(
                String(`Não esqueça de regar a ${plantsStoraged[0].name} daqui ${nextTime}.`)
            )
            setMyPlants(plantsStoraged);
            setLoading(false);

        }
        loadStorageData();
    }, [])
    if (loading) return <Load/>;
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.spotLight}>
                <Image
                    source={WaterDrop}
                    style={styles.spotLightImage}
                />
                <Text style={styles.spotLightText}>
                    {nextWatered}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas Regadas
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <PlantCardSecondary 
                            data={item}
                            handleRemove={() => handleRemove(item)}
                        />
     
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 0 }}
                />


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background,
       

    },
    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotLightImage: {
        width: 60,
        height: 60.
    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
       
    },
    plants: {
        flex: 1,
        width: '100%',

    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        marginVertical: 20,
    }
})