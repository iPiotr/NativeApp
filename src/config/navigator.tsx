import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, SinglePlayerGame } from "@screens";

export type StackNavigatorParams = {
    homeScreen: undefined;
    SinglePlayerGame: { gameId: number };
};

const Stack = createStackNavigator<StackNavigatorParams>();

export default function Navigator(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="homeScreen" component={HomeScreen} />
                <Stack.Screen name="SinglePlayerGame" component={SinglePlayerGame} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
