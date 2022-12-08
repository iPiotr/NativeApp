import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { ReactElement } from "react";
import { AppText } from "@components";
import styles from "./styles";

type ButtonProps = {
    title: string;
} & TouchableOpacityProps;

export default function Button({ title, style, ...props }: ButtonProps): ReactElement {
    return (
        <TouchableOpacity {...props} style={[styles.button, style]}>
            <AppText style={styles.buttonText}>{title}</AppText>
        </TouchableOpacity>
    );
}
