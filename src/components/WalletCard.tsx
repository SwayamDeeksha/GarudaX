import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet } from "@/types";
import { formatMoney } from "@/lib/format";

export function WalletCard({
  wallet,
  onPress,
}: {
  wallet: Wallet;
  onPress?: () => void;
}) {
  const formatted = formatMoney(
    wallet.availableBalance,
    wallet.currency
  );

  // 🔥 SAFE split (first char = symbol, rest = amount)
  const symbol = formatted[0];
  const amount = formatted.slice(1);

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-2xl"
    >
      <LinearGradient
        colors={["#102A4C", "#0A1B34"]}
        className="p-4 border border-white/10"
      >
        {/* 🔹 Top Row */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-slate-300">
              {wallet.flag} wallet
            </Text>

            <Text className="mt-1 text-2xl font-black text-white">
              {wallet.currency}
            </Text>
          </View>

          {/* 🔥 PREMIUM AMOUNT */}
          <View className="items-end">
            <Text className="text-xs text-slate-300">
              Available
            </Text>

            <View className="flex-row items-end mt-1">
              {/* Symbol */}
              <Text className="mr-1 text-base font-bold text-white opacity-80">
                {symbol}
              </Text>

              {/* Amount */}
              <Text className="text-2xl font-black text-white">
                {amount}
              </Text>
            </View>
          </View>
        </View>

        {/* 🔹 Pending */}
        <Text className="mt-3 text-sm text-slate-300">
          Pending:{" "}
          {formatMoney(
            wallet.pendingBalance,
            wallet.currency
          )}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}