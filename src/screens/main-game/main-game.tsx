import { SafeAreaView, Dimensions, View } from "react-native";
import React, { ReactElement, useEffect, useState, useRef } from "react";
import { GradientBackground, Text } from "@components";
import styles from "./main-game.styles";
import { Board, Button } from "@components";
import { BoardState, isEmpty, isTerminal, getBestMove, Cell } from "@utils";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default function Game(): ReactElement {
  // prettier-ignore
  const [state, setState] = useState<BoardState>([
        null,null,null,
        null,null,null,
        null,null,null,
    ]);

  const [turn, setTurn] = useState<"HUMAN" | "BOT">(
    Math.random() < 0.5 ? "HUMAN" : "BOT",
  );
  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);

  const [gamesCount, setGamesCount] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: "x" | "o"): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = symbol;
    setState(stateCopy);
  };

  const handleOnCellPressed = (cell: number): void => {
    if (turn !== "HUMAN") return;

    insertCell(cell, isHumanMaximizing ? "x" : "o");
    setTurn("BOT");
  };

  const getWinner = (winnerSymbol: Cell): "HUMAN" | "BOT" | "DRAW" => {
    if (winnerSymbol === "x") {
      return isHumanMaximizing ? "HUMAN" : "BOT";
    }
    if (winnerSymbol === "o") {
      return isHumanMaximizing ? "BOT" : "HUMAN";
    }
    return "DRAW";
  };

  const newGame = () => {
    setState([null, null, null, null, null, null, null, null, null]);
    setTurn(Math.random() < 0.5 ? "HUMAN" : "BOT");
  };

  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);
      if (winner === "HUMAN") {
        setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
      }
      if (winner === "BOT") {
        setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
      }
      if (winner === "DRAW") {
        setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
      }
    } else {
      if (turn === "BOT") {
        if (isEmpty(state)) {
          const centerAndCorners = [0, 2, 6, 8, 4];
          const firstMove =
            centerAndCorners[
              Math.floor(Math.random() * centerAndCorners.length)
            ];
          insertCell(firstMove, "x");
          setIsHumanMaximizing(false);
          setTurn("HUMAN");
        } else {
          const best = getBestMove(state, !isHumanMaximizing, 0, -1);
          insertCell(best, isHumanMaximizing ? "o" : "x");
          setTurn("HUMAN");
        }
      }
    }
  }, [state, turn]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.titleTxt}>tic-tac-toe</Text>
        </View>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"}
          onCellPressed={(cell) => {
            handleOnCellPressed(cell);
          }}
          state={state}
          gameResult={gameResult}
          size={SCREEN_WIDTH - 60}
        />

        {gameResult && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {getWinner(gameResult.winner) === "HUMAN" && "You Won"}
              {getWinner(gameResult.winner) === "BOT" && "You Lost"}
              {getWinner(gameResult.winner) === "DRAW" && "IT's a Draw"}
            </Text>
            <Button
              onPress={() => {
                newGame();
              }}
              title="Play Again"
            />
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}
