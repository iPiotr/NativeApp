import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, GameScreen } from "@screens";

export type StackNavigatorParams = {
    homeScreen: undefined;
    gameScreen: { gameId: string };
};

const Stack = createStackNavigator<StackNavigatorParams>();

export default function Navigator(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="homeScreen" component={HomeScreen} />
                <Stack.Screen name="gameScreen" component={GameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
