import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Game() {
  return (
    <View>
      <Text>Game</Text>
      <TouchableOpacity
        onPress={() => router.push("end-game")}
        className="flex-row items-center bg-purple-600 px-8 py-4 rounded-lg shadow-lg active:bg-purple-700 mt-10">
        <Text className="text-white text-lg font-semibold ml-2">End Game</Text>
      </TouchableOpacity>
    </View>
  );
}
