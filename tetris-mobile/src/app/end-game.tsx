import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useFonts, VT323_400Regular } from "@expo-google-fonts/vt323";
import Logo from "../components/Logo/logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function EndGame() {
  const [fontsLoaded] = useFonts({
    VT323: VT323_400Regular,
  });

  const { score, lines } = useLocalSearchParams<{
    score: string;
    lines: string;
  }>();

  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    const saveBestScore = async () => {
      try {
        const storedScore = await AsyncStorage.getItem("bestScore");
        const currentScore = Number(score);

        if (storedScore === null || currentScore > Number(storedScore)) {
          await AsyncStorage.setItem("bestScore", String(currentScore));
          setBestScore(currentScore);
        } else {
          setBestScore(Number(storedScore));
        }
      } catch (error) {
        console.log("Erro ao salvar score:", error);
      }
    };

    saveBestScore();
  }, [score]);

  if (!fontsLoaded) {
    return null;
  }

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
          {bestScore !== null && (
            <Text
              style={{ fontFamily: "VT323" }}
              className="text-orange-400 text-2xl mt-4">
              Melhor Pontuação: {bestScore}
            </Text>
          )}
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
