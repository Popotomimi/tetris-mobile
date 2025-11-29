import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ControlsProps {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onDownFast: () => void;
}

export default function Controls({
  onUp,
  onDown,
  onLeft,
  onRight,
  onDownFast,
}: ControlsProps) {
  return (
    <View className="mt-12 flex-row justify-around items-center w-full px-8">
      <View>
        <View className="flex-row justify-center">
          <TouchableOpacity
            onPress={onUp}
            className="bg-purple-600 p-1 pb-3 rounded-t-lg mx-2">
            <MaterialIcons name="keyboard-arrow-up" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <TouchableOpacity
            onPress={onLeft}
            className="bg-purple-600 p-1 pr-7 rounded-l-lg">
            <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onRight}
            className="bg-purple-600 p-1 pl-7 rounded-r-lg">
            <MaterialIcons
              name="keyboard-arrow-right"
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <TouchableOpacity
            onPress={onDown}
            className="bg-purple-600 p-1 pt-3 rounded-b-lg mx-2">
            <MaterialIcons name="keyboard-arrow-down" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={onDownFast}
        className="bg-purple-600 p-10 rounded-full"
        style={{
          shadowColor: "#f1f1f1",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.8,
          shadowRadius: 6,
          elevation: 5,
        }}>
        <MaterialIcons name="arrow-downward" size={29} color="white" />
      </TouchableOpacity>
    </View>
  );
}
