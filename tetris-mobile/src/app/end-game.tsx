import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useFonts, VT323_400Regular } from "@expo-google-fonts/vt323";
import Logo from "../components/Logo/logo";

export default function EndGame() {
  const [fontsLoaded] = useFonts({
    VT323: VT323_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const { score, lines } = useLocalSearchParams<{
    score: string;
    lines: string;
  }>();

  return (
    <View className="flex-1 bg-zinc-900 items-center justify-center">
      <Text
        className="text-red-500 text-4xl mb-6"
        style={{ fontFamily: "VT323" }}>
        💀 Game Over 💀
      </Text>

      <Logo />

      {score === "0" ? (
        <Text
          style={{ fontFamily: "VT323" }}
          className="text-white text-2xl mb-8 mt-8">
          Você não conseguiu nem o mínimo
        </Text>
      ) : (
        <View className="items-center mb-6">
          <Text
            style={{ fontFamily: "VT323" }}
            className="text-white text-2xl mt-6">
            Pontos: {score}
          </Text>
          <Text style={{ fontFamily: "VT323" }} className="text-white text-2xl">
            Linhas: {lines}
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => router.push("start-game")}
        className="bg-purple-600 px-8 py-4 rounded-lg active:bg-purple-700">
        <Text style={{ fontFamily: "VT323" }} className="text-white text-2xl">
          Reiniciar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
