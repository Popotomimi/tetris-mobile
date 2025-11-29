import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { useAudioPlayer } from "expo-audio";
import Board from "../components/Board";
import Controls from "../components/Controls";
import { randomTetromino } from "../lib/tetris/tetrominoes";
import { checkCollision, mergePiece } from "../lib/tetris/collision";
import { clearLines } from "../lib/tetris/board";
import { rotatePiece } from "../lib/tetris/utils";

const COLS = 10;
const ROWS = 20;

export default function Game() {
  const [board, setBoard] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(0))
  );
  const [piece, setPiece] = useState(randomTetromino());
  const [pos, setPos] = useState({ x: 4, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [speed, setSpeed] = useState(800);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const player = useAudioPlayer(require("../../assets/sounds/game.wav"));

  useEffect(() => {
    player.play();
    player.loop = true;
    player.volume = 0.8;

    return () => {
      player.pause();
    };
  }, []);

  useEffect(() => {
    if (gameOver) {
      player.pause();
    }
  }, [gameOver]);

  const getLevel = (score: number) => {
    if (score >= 1500) return 4;
    if (score >= 1000) return 3;
    if (score >= 500) return 2;
    return 1;
  };

  useEffect(() => {
    const newLevel = getLevel(score);
    setLevel(newLevel);

    if (newLevel === 1) setSpeed(800);
    if (newLevel === 2) setSpeed(500);
    if (newLevel === 3) setSpeed(300);
    if (newLevel === 4) setSpeed(100);
  }, [score]);

  useEffect(() => {
    if (gameOver) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => moveDown(), speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pos, piece, speed, board, gameOver]);

  const moveDown = () => {
    const nextPos = { x: pos.x, y: pos.y + 1 };

    if (checkCollision(board, piece, nextPos)) {
      const fixedBoard = mergePiece(board, piece, pos);
      const { newBoard, cleared } = clearLines(fixedBoard, ROWS, COLS);

      if (cleared > 0) {
        setLines((prev) => prev + cleared);
        setScore((prev) => prev + [0, 40, 100, 300, 1200][cleared]);
        setSpeed((s) => Math.max(200, s - 20));
      }
      setBoard(newBoard);

      const newPiece = randomTetromino();
      const startPos = { x: 4, y: 0 };

      if (checkCollision(newBoard, newPiece, startPos)) {
        setGameOver(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        router.push({
          pathname: "end-game",
          params: { score: score.toString(), lines: lines.toString() },
        });
        return;
      }

      setPiece(newPiece);
      setPos(startPos);
    } else {
      setPos(nextPos);
    }
  };

  const moveDownFast = () => {
    let steps = 5;
    let nextPos = pos;

    for (let i = 0; i < steps; i++) {
      const probePos = { x: nextPos.x, y: nextPos.y + 1 };
      if (checkCollision(board, piece, probePos)) {
        const fixedBoard = mergePiece(board, piece, nextPos);
        const { newBoard, cleared } = clearLines(fixedBoard, ROWS, COLS);

        if (cleared > 0) {
          setLines((prev) => prev + cleared);
          setScore((prev) => prev + [0, 40, 100, 300, 1200][cleared]);
          setSpeed((s) => Math.max(200, s - 20));
        }
        setBoard(newBoard);

        const newPiece = randomTetromino();
        const startPos = { x: 4, y: 0 };

        if (checkCollision(newBoard, newPiece, startPos)) {
          setGameOver(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
          router.push({
            pathname: "end-game",
            params: { score: score.toString(), lines: lines.toString() },
          });
          return;
        }

        setPiece(newPiece);
        setPos(startPos);
        return;
      } else {
        nextPos = probePos;
      }
    }

    setPos(nextPos);
  };

  const moveLeft = () => {
    const nextPos = { x: pos.x - 1, y: pos.y };
    if (!checkCollision(board, piece, nextPos)) {
      setPos(nextPos);
    }
  };

  const moveRight = () => {
    const nextPos = { x: pos.x + 1, y: pos.y };
    if (!checkCollision(board, piece, nextPos)) {
      setPos(nextPos);
    }
  };

  const rotate = () => {
    const rotated = rotatePiece(piece);
    if (!checkCollision(board, rotated, pos)) {
      setPiece(rotated);
    }
  };

  return (
    <View className="flex-1 bg-zinc-900 items-center pt-10">
      <View className="w-full px-6 mb-4 flex-row items-center justify-between">
        <Text className="text-white text-2xl">🎮 Tetris</Text>
        <View className="flex-row gap-4">
          <Text className="text-white">Pontos: {score}</Text>
          <Text className="text-white">Linhas: {lines}</Text>
          <Text className="text-white">Nível: {level}</Text>
        </View>
      </View>

      <Board board={board} piece={piece} pos={pos} />
      <Controls
        onUp={rotate}
        onDown={moveDown}
        onLeft={moveLeft}
        onRight={moveRight}
        onDownFast={moveDownFast}
      />
    </View>
  );
}
