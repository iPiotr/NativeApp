import { ScrollView, View, TouchableOpacity, Switch } from "react-native";
import React, { ReactElement } from "react";
import { GradientBackground, AppText } from "@components";
import { colors } from "@utils";
import { difficulties, useSettings } from "../../contexts/settings-context";

import styles from "./styles";

export default function Settings(): ReactElement | null {
    const { settings, saveSettings } = useSettings();
    if (!settings) return null;
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <AppText style={styles.label}>Difficulty level</AppText>
                    <View style={styles.choices}>
                        {Object.keys(difficulties).map((level) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        saveSettings(
                                            "difficulty",
                                            level as keyof typeof difficulties
                                        );
                                    }}
                                    style={[
                                        styles.choice,
                                        {
                                            backgroundColor:
                                                settings.difficulty === level
                                                    ? colors.lightBlue
                                                    : colors.darkBlue
                                        }
                                    ]}
                                    key={level}
                                >
                                    <AppText>
                                        {difficulties[level as keyof typeof difficulties]}
                                    </AppText>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
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
