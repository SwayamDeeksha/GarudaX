import { useEffect, useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { CurrencySelector } from "@/components/CurrencySelector";
import { FeeBreakdown } from "@/components/FeeBreakdown";
import { QuoteSummaryCard } from "@/components/QuoteSummaryCard";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { CurrencyCode } from "@/types";
import { useTransferStore } from "@/store/transferStore";

export default function SendMoneyAmountScreen() {
  const draft = useTransferStore((state) => state.draft);
  const setDraft = useTransferStore((state) => state.setDraft);
  const getQuote = useTransferStore((state) => state.getQuote);
  const [source, setSource] = useState<CurrencyCode>(draft.sourceCurrency);
  const [destination, setDestination] = useState<CurrencyCode>(draft.destinationCurrency);
  const [amount, setAmount] = useState(String(draft.amount));
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft({ sourceCurrency: source, destinationCurrency: destination, amount: Number(amount || 0) });
  }, [amount, destination, setDraft, source]);

  const quote = async () => {
    if (source === destination) return setError("Choose different source and destination currencies.");
    if (Number(amount) < 10) return setError("Minimum transfer is equivalent of 10 USD.");
    setError("");
    await getQuote();
  };

  return (
    <Screen>
      <ScreenHeader title="Send money" subtitle="Step 1-4: currencies, amount, and quote." />
      <CurrencySelector label="Source currency" value={source} onChange={setSource} />
      <CurrencySelector label="Destination currency" value={destination} onChange={setDestination} />
      <AppInput label="Send amount" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} error={error} />
      <AppButton title="Get quote" icon="receipt" onPress={quote} />
      {draft.quote ? <QuoteSummaryCard quote={draft.quote} /> : null}
      <FeeBreakdown />
      <Text className="my-4 text-xs text-slate-400">Quote includes FX markup, transfer fee, tax/GST if applicable, and recipient amount before confirmation.</Text>
      <AppButton title="Select beneficiary" icon="people" onPress={() => router.push("/send/beneficiary")} disabled={!draft.quote} />
    </Screen>
  );
}
