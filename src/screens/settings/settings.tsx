import { ScrollView, View, Switch, Button, Linking } from "react-native";
import React, { ReactElement } from "react";
import { GradientBackground, AppText } from "@components";
import { colors } from "@utils";
import { difficulties, languages, useSettings } from "../../contexts/settings-context";
import { SelectList } from "react-native-dropdown-select-list";
import * as Haptics from "expo-haptics";

import "../../lang";
import { useTranslation } from "react-i18next";

import styles from "./styles";

export default function Settings(): ReactElement | null {
    const { settings, saveSettings } = useSettings();
    const { t } = useTranslation();

    const [selected, setSelected] = React.useState("");

    const [langSelected, setLangSelected] = React.useState("");

    const info = difficulties
        .filter(function (difficulty) {
            return difficulty.key === settings?.difficulty;
        })
        .pop();

    const langInfo = languages
        .filter(function (language) {
            return language.key === settings?.language;
        })
        .pop();

    if (!settings) return null;
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <AppText style={styles.label}>{t("settingsScreen.difficultyLevel")}</AppText>
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
                            value: t(`difficulties.${info?.value}`)
                        }}
                        onSelect={() => {
                            saveSettings("difficulty", selected);
                        }}
                    />
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <AppText style={styles.label}>{t("settingsScreen.sounds")}</AppText>
                    <Switch
                        trackColor={{ false: colors.darkRed, true: colors.green }}
                        thumbColor={colors.white}
                        ios_backgroundColor={colors.darkRed}
                        value={settings.sounds}
                        onValueChange={() => {
                            settings.sounds === false
                                ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                                : "";
                            saveSettings("sounds", !settings.sounds);
                        }}
                    />
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <AppText style={styles.label}>{t("settingsScreen.vibrations")}</AppText>
                    <Switch
                        trackColor={{ false: colors.darkRed, true: colors.green }}
                        thumbColor={colors.white}
                        ios_backgroundColor={colors.darkRed}
                        value={settings.vibrations}
                        onValueChange={() => {
                            saveSettings("vibrations", !settings.vibrations);
                            settings.vibrations === false
                                ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                                : "";
                        }}
                    />
                </View>

                <View style={styles.field}>
                    <AppText style={styles.label}>{t("settingsScreen.language")}</AppText>
                    <SelectList
                        setSelected={setLangSelected}
                        data={languages}
                        save="key"
                        fontFamily="Amiko_400Regular"
                        boxStyles={styles.selectBox}
                        inputStyles={styles.selectInput}
                        dropdownStyles={styles.dropdownBox}
                        dropdownTextStyles={styles.dropdownItemText}
                        dropdownItemStyles={styles.dropdownItem}
                        search={false}
                        defaultOption={{
                            key: settings.language,
                            value: langInfo?.value
                        }}
                        onSelect={() => {
                            saveSettings("language", langSelected);
                        }}
                    />
                </View>

                <Button
                    onPress={() => Linking.openURL("mailto:ip.starzec@gmail.com")}
                    title={t("settingsScreen.submitFeedback")}
                    color={colors.lightBlue}
                />
            </ScrollView>
        </GradientBackground>
    );
}
