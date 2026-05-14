import { Pressable, Text, View } from "react-native";
import { Transaction } from "@/types";
import { formatDate, formatMoney } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";

export function TransactionCard({
  transaction,
  onPress,
}: {
  transaction: Transaction;
  onPress?: () => void;
}) {
  // 🔥 Status-based container styles
  const containerStyle = (() => {
    if (transaction.status === "Completed") {
      return "bg-emerald-500/10 border-emerald-400/30";
    }
    if (transaction.status === "Processing") {
      return "bg-amber-500/10 border-amber-400/30";
    }
    if (transaction.status.includes("Compliance")) {
      return "bg-red-500/10 border-red-400/30";
    }
    return "bg-navy-900 border-white/10";
  })();

  // 🔥 Amount color
  const amountColor =
    transaction.status === "Completed"
      ? "text-white"
      : "text-slate-100";

  return (
    <Pressable
      onPress={onPress}
      className={`mb-3 rounded-2xl border p-4 ${containerStyle}`}
    >
      {/* 🔹 Top Section */}
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-base font-bold text-white">
            {transaction.beneficiaryName}
          </Text>

          <Text className="mt-1 text-xs text-slate-300">
            {transaction.reference} •{" "}
            {formatDate(transaction.createdAt)}
          </Text>
        </View>

        <StatusBadge label={transaction.status} />
      </View>

      {/* 🔹 Bottom Section */}
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-sm text-slate-300">
          {transaction.sourceCurrency} to{" "}
          {transaction.destinationCurrency}
        </Text>

        {/* 🔥 Fixed amount */}
        <Text className={`text-lg font-black ${amountColor}`}>
          {formatMoney(
            transaction.amount,
            transaction.sourceCurrency
          )}
        </Text>
      </View>
    </Pressable>
  );
}