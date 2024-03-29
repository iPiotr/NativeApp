import React, {
    ReactElement,
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const difficulties = [
    { key: "1", value: "Easy" },
    { key: "2", value: "Medium" },
    { key: "3", value: "Hard" },
    { key: "-1", value: "Impossible" }
];

const languages = [
    { key: "1", value: "en" },
    { key: "2", value: "pl" }
];

type SettingsType = {
    difficulty: "1" | "2" | "3" | "-1";
    vibrations: boolean;
    sounds: boolean;
    language: "1" | "2";
};

const defaultSettings: SettingsType = {
    difficulty: "-1",
    vibrations: true,
    sounds: true,
    language: "1"
};

type SettingsContextType = {
    settings: SettingsType | null;
    loadSettings: () => void;
    saveSettings: <T extends keyof SettingsType>(settings: T, value: SettingsType[T]) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function useSettings(): SettingsContextType {
    const context = useContext(SettingsContext);
    if (!context) throw new Error("useSettings must be used within a SettingsProvider");
    return context;
}

function SettingsProvider(props: { children: ReactNode }): ReactElement {
    const [settings, setSettings] = useState<SettingsType | null>(null);

    const saveSettings = async <T extends keyof SettingsType>(
        setting: T,
        value: SettingsType[T]
    ) => {
        try {
            const odlSettings = settings ? settings : defaultSettings;
            const newSettings = { ...odlSettings, [setting]: value };

            const jsonSettings = JSON.stringify(newSettings);
            await AsyncStorage.setItem("@settings", jsonSettings);

            setSettings(newSettings);
        } catch (error) {
            Alert.alert("Error!", "Error");
        }
    };

    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.getItem("@settings");
            settings !== null ? setSettings(JSON.parse(settings)) : setSettings(defaultSettings);
        } catch (error) {
            setSettings(defaultSettings);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    return (
        <SettingsContext.Provider
            {...props}
            value={{
                settings,
                saveSettings,
                loadSettings
            }}
        />
    );
}

export { useSettings, SettingsProvider, difficulties, languages };
