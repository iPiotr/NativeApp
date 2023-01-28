import React from "react";
import { View, ScrollView, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { GradientBackground, Button } from "@components";
import styles from "./styles";

import "../../lang";
import { useTranslation } from "react-i18next";

type HomeProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps) {
    const { t } = useTranslation();

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
                        title={"Single Player" || t("homeScreen.singlePlayer")}
                    />
                    {/* <Button style={styles.button} title="Multiplayer" /> */}
                    <Button
                        onPress={() => {
                            navigation.navigate("Settings");
                        }}
                        style={styles.button}
                        title={"Settings" || t("homeScreen.settings")}
                    />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
