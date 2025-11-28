import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useFonts, VT323_400Regular } from "@expo-google-fonts/vt323";
import Logo from "../components/Logo/logo";

export default function StartGame() {
  const [fontsLoaded] = useFonts({
    VT323: VT323_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 bg-zinc-800 items-center justify-center">
      <View className="flex-row">
        <Text
          style={{ color: "#FF0000", fontFamily: "VT323" }}
          className="text-8xl">
          T
        </Text>
        <Text
          style={{ color: "#FFA500", fontFamily: "VT323" }}
          className="text-8xl">
          E
        </Text>
        <Text
          style={{ color: "#FFFF00", fontFamily: "VT323" }}
          className="text-8xl">
          T
        </Text>
        <Text
          style={{ color: "#00FF00", fontFamily: "VT323" }}
          className="text-8xl">
          R
        </Text>
        <Text
          style={{ color: "#0000FF", fontFamily: "VT323" }}
          className="text-8xl">
          I
        </Text>
        <Text
          style={{ color: "#800080", fontFamily: "VT323" }}
          className="text-8xl">
          S
        </Text>
      </View>

      <Logo />

      <TouchableOpacity
        onPress={() => router.push("game")}
        className="flex-row items-center bg-purple-600 px-8 py-4 rounded-lg shadow-lg active:bg-purple-700 mt-10">
        <Text
          style={{ fontFamily: "VT323" }}
          className="text-white text-2xl font-semibold ml-2">
          Jogar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
