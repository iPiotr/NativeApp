import { StyleSheet } from "react-native";
import { colors } from "@utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 80
    },
    difficulty: {
        color: colors.black,
        fontSize: 22,
        textAlign: "center",
        marginBottom: 20
    },
    results: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 60
    },
    resultsBox: {
        backgroundColor: colors.lightBlue,
        alignItems: "center",
        minWidth: 90,
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 20
    },
    resultsTitle: {
        color: colors.black,
        fontSize: 14
    },
    resultsCount: {
        color: colors.black,
        fontSize: 20
    },
    modal: {
        position: "absolute",
        backgroundColor: colors.darkBlue,
        bottom: 30,
        left: 30,
        right: 30,
        padding: 30,
        borderRadius: 20
    },
    modalTitle: {
        color: colors.orange,
        fontSize: 28,
        textAlign: "center",
        marginBottom: 10
    },
    shadow: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 12
    }
});

export default styles;
