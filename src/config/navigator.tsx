import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { Home, SinglePlayerGame, Settings } from "@screens";
import { colors } from "@utils";

export type StackNavigatorParams = {
    Home: undefined;
    SinglePlayerGame: undefined;
    Settings: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.darkBlue,
        shadowRadius: 0,
        shadowOffset: {
            width: 0,
            height: 0
        }
    },
    headerTitleStyle: {
        fontFamily: "Amiko_700Bold",
        fontSize: 20
    },
    headerBackTitleStyle: {
        fontFamily: "Amiko_700Bold",
        fontSize: 16
    }
};

export default function Navigator(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={navigatorOptions}>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen
                    name="SinglePlayerGame"
                    component={SinglePlayerGame}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
