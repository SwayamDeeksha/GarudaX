import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function TimelineStep({ title, subtitle, done, last }: { title: string; subtitle?: string; done?: boolean; last?: boolean }) {
  return (
    <View className="flex-row">
      <View className="items-center">
        <View className={`h-9 w-9 items-center justify-center rounded-full ${done ? "bg-gold-500" : "bg-navy-800"}`}>
          <Ionicons name={done ? "checkmark" : "ellipse-outline"} size={18} color={done ? "#061428" : "#7C8AA5"} />
        </View>
        {!last ? <View className="h-12 w-px bg-white/10" /> : null}
      </View>
      <View className="ml-3 flex-1 pb-6">
        <Text className="font-bold text-white">{title}</Text>
        {subtitle ? <Text className="mt-1 text-xs text-slate-300">{subtitle}</Text> : null}
      </View>
    </View>
  );
}
