import { useRef, useEffect } from "react";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useSettings } from "../contexts/settings-context";

type SoundType = "pop1" | "pop2" | "win" | "lose" | "draw";

export default function useSounds(): (sound: SoundType) => void {
    const { settings } = useSettings();
    const popSoundRef = useRef<Audio.Sound | null>(null);
    const pop2SoundRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);
    const loseSoundRef = useRef<Audio.Sound | null>(null);
    const drawSoundRef = useRef<Audio.Sound | null>(null);

    const playSound = async (sound: SoundType): Promise<void> => {
        const soundsMap = {
            pop1: popSoundRef,
            pop2: pop2SoundRef,
            win: winSoundRef,
            lose: loseSoundRef,
            draw: drawSoundRef
        };
        try {
            const status = await soundsMap[sound].current?.getStatusAsync();
            status &&
                status.isLoaded &&
                settings?.sounds &&
                soundsMap[sound].current?.replayAsync();
            if (settings?.vibrations) {
                switch (sound) {
                    case "pop1":
                    case "pop2":
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        break;
                    case "win":
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        break;
                    case "lose":
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                        break;
                    case "draw":
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                        break;
                    default:
                        break;
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const popSoundObject = new Audio.Sound();
        const pop2SoundObject = new Audio.Sound();
        const winSoundObject = new Audio.Sound();
        const loseSoundObject = new Audio.Sound();
        const drawSoundObject = new Audio.Sound();

        const loadSounds = async () => {
            /* eslint-disable @typescript-eslint/no-var-requires */
            await popSoundObject.loadAsync(require("~assets/pop_o.mp3"));
            popSoundRef.current = popSoundObject;

            await pop2SoundObject.loadAsync(require("~assets/pop_x.wav"));
            pop2SoundRef.current = pop2SoundObject;

            await winSoundObject.loadAsync(require("~assets/win.wav"));
            winSoundRef.current = winSoundObject;

            await loseSoundObject.loadAsync(require("~assets/lose.wav"));
            loseSoundRef.current = loseSoundObject;

            await drawSoundObject.loadAsync(require("~assets/draw.wav"));
            drawSoundRef.current = drawSoundObject;
        };
        loadSounds();

        return () => {
            popSoundObject && popSoundObject.unloadAsync();
            pop2SoundObject && pop2SoundObject.unloadAsync();
            winSoundObject && winSoundObject.unloadAsync();
            loseSoundObject && loseSoundObject.unloadAsync();
            drawSoundObject && drawSoundObject.unloadAsync();
        };
    }, []);

    return playSound;
}
