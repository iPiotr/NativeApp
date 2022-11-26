import React, { ReactNode, ReactElement } from "react";
import AppLoading from "expo-app-loading"; //TODO: change to splash screen
import { useFonts, Amiko_400Regular, Amiko_700Bold } from "@expo-google-fonts/amiko";

type AppBootstrapProps = {
    children: ReactNode;
};

export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {
    {
        const [fontsLoaded] = useFonts({
            Amiko_400Regular,
            Amiko_700Bold
        });

        return fontsLoaded ? <>{children}</> : <AppLoading />;
    }
}
