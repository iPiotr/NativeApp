import { StyleSheet } from "react-native";
import { colors } from "@utils";

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightgrey", // TODO: Add to colors
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 50,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 12
    },
    buttonText: {
        fontSize: 20,
        color: colors.black,
        textAlign: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8
    }
});

export default styles;
