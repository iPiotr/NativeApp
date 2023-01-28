import { StyleSheet } from "react-native";
import { colors } from "@utils";

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    field: {
        marginBottom: 20
    },
    label: {
        fontSize: 22,
        color: colors.white
    },
    choices: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 30
    },
    choice: {
        backgroundColor: colors.darkBlue,
        borderWidth: 1,
        padding: 10,
        margin: 5,
        borderRadius: 20
    },
    switchField: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10
    },
    selectBox: {
        borderColor: colors.white
    },
    selectInput: {
        fontSize: 16,
        color: colors.white
    },
    dropdownBox: {
        borderColor: colors.white
    },
    dropdownItemText: {
        fontSize: 16,
        color: colors.white
    },
    dropdownItem: {
        margin: 4,
        color: colors.white
    }
});

export default styles;
