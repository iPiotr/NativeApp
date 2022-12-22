import { ScrollView, View, TouchableOpacity, Switch } from "react-native";
import React, { ReactElement } from "react";
import { GradientBackground, AppText } from "@components";
import { colors } from "@utils";
import { difficulties, useSettings } from "../../contexts/settings-context";
import { SelectList } from "react-native-dropdown-select-list";

import styles from "./styles";

export default function Settings(): ReactElement | null {
    const { settings, saveSettings } = useSettings();

    const [selected, setSelected] = React.useState("");

    const info = difficulties
        .filter(function (difficulty) {
            return difficulty.key === settings?.difficulty;
        })
        .pop();

    if (!settings) return null;
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <AppText style={styles.label}>Difficulty level</AppText>
                    <SelectList
                        setSelected={setSelected}
                        data={difficulties}
                        save="key"
                        fontFamily="Amiko_400Regular"
                        boxStyles={styles.selectBox}
                        inputStyles={styles.selectInput}
                        dropdownStyles={styles.dropdownBox}
                        dropdownTextStyles={styles.dropdownItemText}
                        dropdownItemStyles={styles.dropdownItem}
                        search={false}
                        defaultOption={{
                            key: settings.difficulty,
                            value: info?.value
                        }}
                        onSelect={() => {
                            saveSettings("difficulty", selected);
                        }}
                    />
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <AppText style={styles.label}>Sounds</AppText>
                    <Switch
                        trackColor={{ false: colors.darkRed, true: colors.green }}
                        thumbColor={colors.white}
                        ios_backgroundColor={colors.darkRed}
                        value={settings.sounds}
                        onValueChange={() => {
                            saveSettings("sounds", !settings.sounds);
                        }}
                    />
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <AppText style={styles.label}>Vibrations</AppText>
                    <Switch
                        trackColor={{ false: colors.darkRed, true: colors.green }}
                        thumbColor={colors.white}
                        ios_backgroundColor={colors.darkRed}
                        value={settings.vibrations}
                        onValueChange={() => {
                            saveSettings("vibrations", !settings.vibrations);
                        }}
                    />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
