import { Pressable, Text, View } from "react-native";
import { supportedCurrencies } from "@/constants/options";
import { CurrencyCode } from "@/types";

export function CurrencySelector({ value, onChange, label }: { value: CurrencyCode; onChange: (value: CurrencyCode) => void; label: string }) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-slate-200">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {supportedCurrencies.map((currency) => (
          <Pressable
            key={currency}
            onPress={() => onChange(currency)}
            className={`rounded-xl border px-3 py-2 ${currency === value ? "border-gold-500 bg-gold-500" : "border-white/10 bg-navy-900"}`}
          >
            <Text className={`text-sm font-bold ${currency === value ? "text-navy-950" : "text-white"}`}>{currency}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
