import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TransactionCard } from "@/components/TransactionCard";
import { WalletCard } from "@/components/WalletCard";
import { useWalletStore } from "@/store/walletStore";
import { useTransferStore } from "@/store/transferStore";

export default function WalletDetailScreen() {
  const { currency } = useLocalSearchParams<{ currency: string }>();
  const wallet = useWalletStore((state) => state.wallets.find((item) => item.currency === currency));
  const transactions = useTransferStore((state) => state.transactions.filter((item) => item.sourceCurrency === currency || item.destinationCurrency === currency));

  return (
    <Screen>
      <ScreenHeader title={`${currency} wallet`} subtitle="Balance, mock actions, and wallet activity." />
      {wallet ? <WalletCard wallet={wallet} /> : <Text className="text-slate-300">Wallet not found.</Text>}
      <View className="mb-5 flex-row gap-3">
        <View className="flex-1"><AppButton title="Add money" icon="add-circle" /></View>
        <View className="flex-1"><AppButton title="Convert" variant="secondary" icon="swap-horizontal" /></View>
      </View>
      <Text className="mb-3 text-lg font-black text-white">Wallet transaction history</Text>
      {transactions.map((transaction) => <TransactionCard key={transaction.id} transaction={transaction} />)}
    </Screen>
  );
}
