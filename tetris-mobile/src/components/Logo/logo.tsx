import { View, Image } from "react-native";

export default function Logo() {
  return (
    <View className="items-center mt-6">
      <Image
        source={require("../../../assets/logo.png")}
        className="w-44 h-44 rounded-xl shadow-lg border-4 border-purple-600 bg-zinc-900"
      />
    </View>
  );
}
