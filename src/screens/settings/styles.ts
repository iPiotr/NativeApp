import { StyleSheet } from "react-native";
import { colors } from "@utils";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    field: {
        marginBottom: 20
    },
    label: {
        fontSize: 22
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
        borderColor: colors.black
    },
    selectInput: {
        fontSize: 16
    },
    dropdownBox: {
        borderColor: colors.black
    },
    dropdownItemText: {
        fontSize: 16
    },
    dropdownItem: {
        margin: 4
    }
});

export default styles;
