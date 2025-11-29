import { View } from "react-native";

export default function Cell({ filled }: { filled: boolean }) {
  return (
    <View
      className={`w-5 h-5 m-0.5 ${filled ? "bg-purple-600" : "bg-zinc-800"}`}
    />
  );
}
