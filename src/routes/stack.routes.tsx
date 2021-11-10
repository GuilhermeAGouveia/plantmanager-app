import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Welcome } from "../pages/Welcome"
import { Confirmation } from "../pages/Confirmation"
import { UserIdentificator } from "../pages/UserIdentificator"
import colors from "../styles/colors"
import { PlantSave } from "../pages/PlantSave"
import { MyPlants } from "../pages/MyPlants"
import AuthRoutes from "./tab.routes"

const stackRoutes = createStackNavigator()

const AppRoute: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle:{
                backgroundColor: colors.white
            }
        }}
        
    >

        <stackRoutes.Screen name="Welcome" component={Welcome}/>
        <stackRoutes.Screen name="UserIdentificator" component={UserIdentificator}/>
        <stackRoutes.Screen name="Confirmation" component={Confirmation}/>
        <stackRoutes.Screen name="PlantSelect" component={AuthRoutes}/>
        <stackRoutes.Screen name="PlantSave" component={PlantSave}/>
        <stackRoutes.Screen name="MyPlants" component={AuthRoutes}/>
    </stackRoutes.Navigator>
)

export default AppRoute;