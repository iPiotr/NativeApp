import { View } from "react-native";
import React, { ReactElement, ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

type gradientBackgroundProps = {
    children: ReactNode;
};

export default function gradientBackground({ children }: gradientBackgroundProps): ReactElement {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <LinearGradient
                style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}
                colors={["#0f52ba", "#007FFF"]}
            />
            {children}
        </View>
    );
}
