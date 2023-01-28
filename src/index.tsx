import React, { ReactElement } from "react";
import { AppBootstrap } from "@components";
import Navigator from "@config/navigator";
import { SettingsProvider } from "./contexts/settings-context";
import Translations18 from "./lang";

export default function App(): ReactElement {
    return (
        <AppBootstrap>
            <SettingsProvider>
                <Navigator />
                <Translations18 />
            </SettingsProvider>
        </AppBootstrap>
    );
}
