import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native"
import fonts from "../styles/fonts"
import colors from "../styles/colors"
import { Header } from "../components/Header"
import { EnviromentButton } from "../components/EnviromentButton";
import api from "../services/api";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load"
import { useNavigation } from "@react-navigation/native";
import { PlantProps } from "../libs/storage"


interface EnviromentProps {
    key: string;
    title: string;
}


export function PlantSelect() {

    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([])
    const [plants, setṔlants] = useState<PlantProps[]>([])
    const [filteredPlants, setFilteredṔlants] = useState<PlantProps[]>([])
    const [enviromentSelected, setEnviromentSelected] = useState('all')
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setloadedAll] = useState(false);

    const navigation = useNavigation();

    async function fetchPlants() {

        const { data } = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=10`);
        
        if (!data) 
            return setLoading(true)
        if (data.length < 8)
            setloadedAll(true)
     
        if (page > 1) {
            setṔlants(oldValue => [...oldValue, ...data])
            setFilteredṔlants(oldValue => [...oldValue, ...data])
        } else {
            setṔlants(data)
            setFilteredṔlants(data)
        }

        setLoading(false);
        setLoadingMore(false);

    }

    function handleEnviromentSelected(enviroment: string) {
        setEnviromentSelected(enviroment);
        if (enviroment === 'all') return setFilteredṔlants(plants);
        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        );
        setFilteredṔlants(filtered);
    }

    function handleFetchMore(distance: number) {
        if (distance < 1) return;
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1)
        fetchPlants();
    }

    function handlePlantSelet(plant: PlantProps){
        navigation.navigate('PlantSave', {plant})
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get('/plants_environments?_sort=title&_order=asc');
            setEnviroments([
                {
                    key: "all",
                    title: "Todos"
                },
                ...data
            ]);
        }
        fetchEnviroment()
    }, [])

    useEffect(() => {
        fetchPlants()
    }, [])


    if (loading) return <Load/>;
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Header></Header>
                <Text style={styles.title}>
                    Em qual ambiente
            </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
            </Text>
            </View>
            <View>
                <FlatList
                    data={enviroments}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <EnviromentButton
                           
                            title={item.title}
                            active={item.key === enviromentSelected}
                            onPress={() => handleEnviromentSelected(item.key)}

                        />

                    )
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)} 
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                        key={item.id} 
                        data={item}
                        onPress={() => handlePlantSelet(item)}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        (loadingMore && !loadedAll)
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

            </View>

            
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        marginTop: 15,
        fontFamily: fonts.heading,
        fontSize: 17,
        lineHeight: 20,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
    },
    enviromentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
        paddingRight: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'

    },


})