import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { AppInput } from "@/components/AppInput";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TransactionCard } from "@/components/TransactionCard";
import { transactionStatuses } from "@/constants/options";
import { CurrencyCode, TransactionStatus } from "@/types";
import { useTransferStore } from "@/store/transferStore";

export default function TransactionsScreen() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TransactionStatus | "All">("All");
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const transactions = useTransferStore((state) => state.transactions);
  const loadTransactions = useTransferStore((state) => state.loadTransactions);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const filtered = useMemo(() => transactions.filter((tx) =>
    (tx.beneficiaryName.toLowerCase().includes(search.toLowerCase()) || tx.reference.toLowerCase().includes(search.toLowerCase())) &&
    (status === "All" || tx.status === status) &&
    (tx.sourceCurrency === currency || tx.destinationCurrency === currency)
  ), [currency, search, status, transactions]);

  return (
    <Screen>
      <ScreenHeader title="Transactions" subtitle="Search, filters, and transfer history." rightIcon="filter" />
      <AppInput label="Search" value={search} onChangeText={setSearch} placeholder="Name or reference" />
      <CurrencySelector label="Filter by currency" value={currency} onChange={setCurrency} />
      <View className="mb-4 flex-row flex-wrap gap-2">
        <Text onPress={() => setStatus("All")} className={`rounded-xl px-3 py-2 text-sm font-bold ${status === "All" ? "bg-gold-500 text-navy-950" : "bg-navy-900 text-white"}`}>All</Text>
        {transactionStatuses.slice(0, 6).map((item) => <Text key={item} onPress={() => setStatus(item)} className={`rounded-xl px-3 py-2 text-sm font-bold ${status === item ? "bg-gold-500 text-navy-950" : "bg-navy-900 text-white"}`}>{item}</Text>)}
      </View>
      <Text className="mb-3 text-xs text-slate-400">Date filter placeholder: connect native date picker for production reports.</Text>
      {filtered.map((transaction) => <TransactionCard key={transaction.id} transaction={transaction} onPress={() => router.push(`/transactions/${transaction.id}`)} />)}
    </Screen>
  );
}
