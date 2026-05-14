import { Text, View } from "react-native";
import { Quote } from "@/types";
import { formatMoney } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";

export function QuoteSummaryCard({ quote }: { quote: Quote }) {
  const rows = [
    ["Exchange rate", `1 ${quote.sourceCurrency} = ${quote.exchangeRate.toFixed(4)} ${quote.destinationCurrency}`],
    ["FX markup", formatMoney(quote.fxMarkup, quote.sourceCurrency)],
    ["Transfer fee", formatMoney(quote.transferFee, quote.sourceCurrency)],
    ["Tax/GST", formatMoney(quote.tax, quote.sourceCurrency)],
    ["Total payable", formatMoney(quote.totalPayable, quote.sourceCurrency)],
    ["Recipient gets", formatMoney(quote.recipientGets, quote.destinationCurrency)],
    ["Delivery", quote.estimatedDelivery]
  ];
  return (
    <View className="mb-5 rounded-2xl border border-gold-500/20 bg-navy-900 p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-black text-white">Quote summary</Text>
        <StatusBadge label={quote.risk} />
      </View>
      {rows.map(([label, value]) => (
        <View key={label} className="flex-row justify-between border-b border-white/5 py-3">
          <Text className="text-sm text-slate-300">{label}</Text>
          <Text className="max-w-[58%] text-right text-sm font-bold text-white">{value}</Text>
        </View>
      ))}
    </View>
  );
}
