import { useState } from "react";
import { Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { CurrencyCode } from "@/types";
import { useExchangeStore } from "@/store/exchangeStore";
import { formatDate, formatMoney } from "@/lib/format";

export default function CurrencyConverterScreen() {
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("INR");
  const [amount, setAmount] = useState("100");
  const [result, setResult] = useState<{ rate: number; convertedAmount: number; fee: number; updatedAt: string } | null>(null);
  const convert = useExchangeStore((state) => state.convert);

  return (
    <Screen>
      <ScreenHeader title="Currency converter" subtitle="Indicative sandbox rates with fee estimate." />
      <CurrencySelector label="From currency" value={from} onChange={setFrom} />
      <CurrencySelector label="To currency" value={to} onChange={setTo} />
      <AppInput label="Amount" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
      <AppButton title="Calculate" icon="calculator" onPress={async () => setResult(await convert(from, to, Number(amount || 0)))} />
      {result ? (
        <View className="mt-5 rounded-2xl border border-gold-500/20 bg-navy-900 p-4">
          <Text className="text-sm text-slate-300">Exchange rate</Text>
          <Text className="mt-1 text-2xl font-black text-white">1 {from} = {result.rate.toFixed(4)} {to}</Text>
          <Text className="mt-4 text-sm text-slate-300">Converted amount</Text>
          <Text className="mt-1 text-2xl font-black text-gold-300">{formatMoney(result.convertedAmount, to)}</Text>
          <Text className="mt-3 text-sm text-slate-300">Fee estimate: {formatMoney(result.fee, from)}</Text>
          <Text className="mt-1 text-xs text-slate-400">Last updated: {formatDate(result.updatedAt)}</Text>
        </View>
      ) : null}
    </Screen>
  );
}
