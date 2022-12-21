import React from "react";
import { View, ScrollView, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { GradientBackground, Button } from "@components";
import styles from "./styles";

type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps) {
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.constainer}>
                <Image style={styles.logo} source={require("~assets/adaptive-icon.png")} />
                <View style={styles.buttons}>
                    <Button
                        onPress={() => {
                            navigation.navigate("SinglePlayerGame");
                        }}
                        style={styles.button}
                        title="Single Player"
                    />
                    <Button style={styles.button} title="Multiplayer" />
                    <Button
                        onPress={() => {
                            navigation.navigate("Settings");
                        }}
                        style={styles.button}
                        title="Settings"
                    />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
