import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { TimelineStep } from "@/components/TimelineStep";
import { useTransferStore } from "@/store/transferStore";
import { formatDate, formatMoney } from "@/lib/format";

export default function TransactionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const transaction = useTransferStore((state) => state.transactions.find((item) => item.id === id));

  if (!transaction) {
    return <Screen><ScreenHeader title="Transaction" /><Text className="text-slate-300">Transaction not found.</Text></Screen>;
  }

  const steps = ["Transfer Created", "Payment Received", "Compliance Check", "Processing", "Sent to Partner Bank", "Completed"];
  const doneIndex = transaction.status === "Completed" ? 5 : transaction.status === "Processing" ? 3 : transaction.status === "Compliance Review" ? 2 : 1;

  return (
    <Screen>
      <ScreenHeader title={transaction.reference} subtitle={formatDate(transaction.createdAt)} />
      <View className="mb-5 rounded-2xl bg-navy-900 p-5">
        <StatusBadge label={transaction.status} />
        <Text className="mt-4 text-3xl font-black text-white">{formatMoney(transaction.amount, transaction.sourceCurrency)}</Text>
        <Text className="mt-1 text-slate-300">Recipient gets {formatMoney(transaction.recipientGets, transaction.destinationCurrency)}</Text>
        <Text className="mt-3 text-slate-300">Beneficiary: {transaction.beneficiaryName}</Text>
        <Text className="mt-1 text-slate-300">Purpose: {transaction.purpose}</Text>
      </View>
      {steps.map((step, index) => <TimelineStep key={step} title={step} done={index <= doneIndex} last={index === steps.length - 1} />)}
    </Screen>
  );
}
