import React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";

import styles from "./styles";

type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "homeScreen">;
};

export default function Home({ navigation }: HomeProps) {
    return (
        <View style={styles.constainer}>
            <Text>Home</Text>
            <Button
                title="Game"
                onPress={() => {
                    navigation.navigate("gameScreen", { gameId: "2" });
                }}
            />
        </View>
    );
}
