import React, { ReactNode, ReactElement } from "react";
import { Text, TextProps } from "react-native";

type AppTextProps = {
    weight: "400" | "700";
    children: ReactNode;
} & TextProps;

const defaultProps = {
    weight: "400"
};

export default function AppText({ children, style, weight, ...props }: AppTextProps): ReactElement {
    let fontFamily;
    if (weight === "400") fontFamily = "Amiko_400Regular";
    if (weight === "700") fontFamily = "Amiko_700Bold";

    return (
        <Text {...props} style={[{ fontFamily }, style]}>
            {children}
        </Text>
    );
}

AppText.defaultProps = defaultProps;
