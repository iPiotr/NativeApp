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

const difficulties = {
    "1": "Easy",
    "2": "Medium",
    "3": "Hard",
    "-1": "Impossible"
};

type SettingsType = {
    difficulty: keyof typeof difficulties;
    vibrations: boolean;
    sounds: boolean;
};

const defaultSettings: SettingsType = {
    difficulty: "-1",
    vibrations: true,
    sounds: true
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

export { useSettings, SettingsProvider, difficulties };
