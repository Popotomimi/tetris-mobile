import { View } from "react-native";
import Cell from "../Cell";

interface BoardProps {
  board: number[][];
  piece: number[][];
  pos: { x: number; y: number };
}

export default function Board({ board, piece, pos }: BoardProps) {
  return (
    <View className="bg-zinc-700 p-1">
      {board.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row">
          {row.map((cell, colIndex) => {
            let filled = cell;
            const relativeY = rowIndex - pos.y;
            const relativeX = colIndex - pos.x;
            if (
              relativeY >= 0 &&
              relativeY < piece.length &&
              relativeX >= 0 &&
              relativeX < piece[0].length
            ) {
              if (piece[relativeY][relativeX]) {
                filled = 1;
              }
            }
            return <Cell key={colIndex} filled={!!filled} />;
          })}
        </View>
      ))}
    </View>
  );
}
