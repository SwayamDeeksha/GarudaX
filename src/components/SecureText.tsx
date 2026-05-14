import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function SecureText({ label, value }: { label: string; value: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-xl bg-navy-800 p-3">
      <View>
        <Text className="text-xs text-slate-300">{label}</Text>
        <Text className="mt-1 font-bold text-white">{visible ? value : value.replace(/.(?=.{4})/g, "•")}</Text>
      </View>
      <Pressable onPress={() => setVisible((item) => !item)}>
        <Ionicons name={visible ? "eye-off" : "eye"} size={19} color="#F0C96A" />
      </Pressable>
    </View>
  );
}
