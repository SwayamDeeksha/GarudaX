import { Text, View } from "react-native";

export function StatusBadge({ label }: { label: string }) {
  let bg = "";
  let text = "";

  if (
    label.includes("Completed") ||
    label.includes("Verified") ||
    label.includes("Low")
  ) {
    bg = "bg-emerald-400/15";
    text = "text-emerald-200";
  } 
  else if (
    label.includes("Processing")
  ) {
    bg = "bg-amber-400/15";     // 🟡 ORANGE
    text = "text-amber-300";
  } 
  else if (
    label.includes("Compliance") ||
    label.includes("Rejected") ||
    label.includes("Failed") ||
    label.includes("High")
  ) {
    bg = "bg-red-400/15";       // 🔴 RED
    text = "text-red-200";
  } 
  else {
    bg = "bg-slate-500/15";
    text = "text-slate-300";
  }

  return (
    <View className={`self-start rounded-full px-3 py-1 ${bg}`}>
      <Text className={`text-xs font-bold ${text}`}>
        {label}
      </Text>
    </View>
  );
}