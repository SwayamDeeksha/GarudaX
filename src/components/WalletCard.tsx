import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet } from "@/types";
import { formatMoney } from "@/lib/format";

export function WalletCard({ wallet, onPress }: { wallet: Wallet; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} className="mb-4 overflow-hidden rounded-2xl">
      <LinearGradient colors={["#102A4C", "#0A1B34"]} className="border border-white/10 p-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-slate-300">{wallet.flag} wallet</Text>
            <Text className="mt-1 text-2xl font-black text-white">{wallet.currency}</Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-slate-300">Available</Text>
            <Text className="mt-1 text-xl font-black text-gold-300">{formatMoney(wallet.availableBalance, wallet.currency)}</Text>
          </View>
        </View>
        <Text className="mt-3 text-sm text-slate-300">Pending: {formatMoney(wallet.pendingBalance, wallet.currency)}</Text>
      </LinearGradient>
    </Pressable>
  );
}
