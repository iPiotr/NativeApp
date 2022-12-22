import React, { ReactElement, useEffect, useState } from "react";
import { SafeAreaView, Dimensions, View } from "react-native";
import { GradientBackground, Board, AppText, Button } from "@components";
import { isEmpty, BoardState, isTerminal, getBestMove, Cell, useSounds } from "../../utils";
import { useSettings, difficulties } from "../../contexts/settings-context";

import styles from "./styles";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default function Game(): ReactElement {
    //prettier-ignore
    const [state, setState] = useState<BoardState>([
        null, null, null,
        null, null, null,
        null, null, null,
    ]);

    const [turn, setTurn] = useState<"PLAYER" | "AI">(Math.random() < 0.5 ? "PLAYER" : "AI");

    const [isPlayerMaximizing, setIsPlayerMaximizing] = useState<boolean>(true);

    const [gamesCount, setGamesCount] = useState({
        wins: 0,
        loses: 0,
        draws: 0
    });

    const playSound = useSounds();
    const { settings } = useSettings();

    const gameResult = isTerminal(state);

    const insertCell = (cell: number, symbol: "x" | "o"): void => {
        const stateCopy: BoardState = [...state];
        if (stateCopy[cell] || isTerminal(stateCopy)) return;
        stateCopy[cell] = symbol;
        setState(stateCopy);
        try {
            symbol === "x" ? playSound("pop1") : playSound("pop2");
        } catch (e) {
            console.log(e);
        }
    };

    const handleOnCellPressed = (cell: number): void => {
        if (turn !== "PLAYER") return;
        insertCell(cell, isPlayerMaximizing ? "x" : "o");
        setTurn("AI");
    };

    const getWinner = (winnerSymbol: Cell): "PLAYER" | "AI" | "DRAW" => {
        if (winnerSymbol === "x") return isPlayerMaximizing ? "PLAYER" : "AI";
        if (winnerSymbol === "o") return isPlayerMaximizing ? "AI" : "PLAYER";
        return "DRAW";
    };

    const newGame = () => {
        setState([null, null, null, null, null, null, null, null, null]);
        setTurn(Math.random() < 0.5 ? "PLAYER" : "AI");
    };

    useEffect(() => {
        if (gameResult) {
            const winner = getWinner(gameResult.winner);

            if (winner === "PLAYER") {
                playSound("win");
                setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
            }
            if (winner === "AI") {
                playSound("lose");
                setGamesCount({ ...gamesCount, loses: gamesCount.loses + 1 });
            }
            if (winner === "DRAW") {
                playSound("draw");
                setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
            }
        } else {
            if (turn === "AI") {
                if (isEmpty(state)) {
                    const centerAndCorners = [0, 2, 6, 8, 4];
                    const firstMove =
                        centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
                    insertCell(firstMove, "x");
                    setIsPlayerMaximizing(false);
                    setTurn("PLAYER");
                } else {
                    const best = getBestMove(
                        state,
                        !isPlayerMaximizing,
                        0,
                        parseInt(settings ? settings.difficulty : "-1")
                    );
                    insertCell(best, isPlayerMaximizing ? "o" : "x");
                    setTurn("PLAYER");
                }
            }
        }
    }, [state, turn]);

    const info = difficulties
        .filter(function (difficulty) {
            return difficulty.key === settings?.difficulty;
        })
        .pop();

    return (
        <GradientBackground>
            <SafeAreaView style={styles.container}>
                <View>
                    <AppText style={styles.difficulty}>
                        Difficulty: {settings ? info?.value : "Impossible"}
                    </AppText>
                    <View style={styles.results}>
                        <View style={[styles.resultsBox, styles.shadow]}>
                            <AppText style={[styles.resultsTitle, styles.shadow]}>Wins</AppText>
                            <AppText style={styles.resultsCount}>{gamesCount.wins}</AppText>
                        </View>
                        <View style={[styles.resultsBox, styles.shadow]}>
                            <AppText style={[styles.resultsTitle, styles.shadow]}>Draws</AppText>
                            <AppText style={styles.resultsCount}>{gamesCount.draws}</AppText>
                        </View>
                        <View style={[styles.resultsBox, styles.shadow]}>
                            <AppText style={[styles.resultsTitle, styles.shadow]}>Losses</AppText>
                            <AppText style={styles.resultsCount}>{gamesCount.loses}</AppText>
                        </View>
                    </View>
                </View>
                <Board
                    disabled={Boolean(isTerminal(state)) || turn !== "PLAYER"}
                    onCellPressed={(cell) => {
                        handleOnCellPressed(cell);
                    }}
                    state={state}
                    gameResult={gameResult}
                    size={SCREEN_WIDTH - 60}
                />
                {gameResult && (
                    <View style={[styles.modal, styles.shadow]}>
                        <AppText style={styles.modalTitle}>
                            {getWinner(gameResult.winner) === "PLAYER" && "You Win!"}
                            {getWinner(gameResult.winner) === "AI" && "You Lose!"}
                            {getWinner(gameResult.winner) === "DRAW" && "Draw!"}
                        </AppText>
                        <Button
                            onPress={() => {
                                newGame();
                            }}
                            title="Play Again"
                        ></Button>
                    </View>
                )}
            </SafeAreaView>
        </GradientBackground>
    );
}
