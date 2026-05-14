import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "@/components/AppButton";
import { KycBanner } from "@/components/KycBanner";
import { Screen } from "@/components/Screen";
import { TransactionCard } from "@/components/TransactionCard";
import { WalletCard } from "@/components/WalletCard";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";
import { useTransferStore } from "@/store/transferStore";
import { useExchangeStore } from "@/store/exchangeStore";
import { useNotificationStore } from "@/store/notificationStore";
import { formatMoney } from "@/lib/format";

export default function HomeDashboardScreen() {
  const user = useAuthStore((state) => state.user);
  const wallets = useWalletStore((state) => state.wallets);
  const loadWallets = useWalletStore((state) => state.loadWallets);
  const transactions = useTransferStore((state) => state.transactions);
  const loadTransactions = useTransferStore((state) => state.loadTransactions);
  const rates = useExchangeStore((state) => state.rates);
  const loadRates = useExchangeStore((state) => state.loadRates);
  const notifications = useNotificationStore((state) => state.notifications);
  const loadNotifications = useNotificationStore((state) => state.loadNotifications);

  useEffect(() => {
    loadWallets();
    loadTransactions();
    loadRates();
    loadNotifications();
  }, [loadNotifications, loadRates, loadTransactions, loadWallets]);

  const totalInr = wallets.reduce((sum, wallet) => sum + (wallet.currency === "INR" ? wallet.availableBalance : wallet.availableBalance * (rates[`${wallet.currency}_INR`] || 83)), 0);
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <Screen>
      <View className="mb-5 flex-row items-center justify-between">
        <View>
          <Text className="text-sm text-slate-300">Namaste,</Text>
          <Text className="text-3xl font-black text-white">{user?.name || "Arjun Rao"}</Text>
        </View>
        <Pressable onPress={() => router.push("/notifications")} className="h-12 w-12 items-center justify-center rounded-xl bg-navy-800">
          <Ionicons name="notifications" size={21} color="#F0C96A" />
          {unread ? <View className="absolute right-2 top-2 h-3 w-3 rounded-full bg-red-400" /> : null}
        </Pressable>
      </View>
      <KycBanner status={user?.kycStatus || "Verified"} />
      <View className="mb-5 rounded-3xl border border-gold-500/20 bg-navy-900 p-5">
        <Text className="text-sm text-slate-300">Total wallet balance equivalent</Text>
        <Text className="mt-2 text-4xl font-black text-white">{formatMoney(totalInr, "INR")}</Text>
        <View className="mt-4 flex-row gap-3">
          <View className="flex-1"><AppButton title="Send" icon="send" onPress={() => router.push("/send/amount")} /></View>
          <View className="flex-1"><AppButton title="Convert" variant="secondary" icon="swap-horizontal" onPress={() => router.push("/wallets/converter")} /></View>
        </View>
      </View>
      <Text className="mb-3 text-lg font-black text-white">Currency wallets</Text>
      {wallets.slice(0, 3).map((wallet) => <WalletCard key={wallet.currency} wallet={wallet} onPress={() => router.push(`/wallets/${wallet.currency}`)} />)}
      <View className="mb-4 rounded-2xl bg-navy-900 p-4">
        <Text className="font-black text-white">Exchange ticker</Text>
        <Text className="mt-2 text-sm text-slate-300">USD/INR {rates.USD_INR || 83.12} • EUR/INR {rates.EUR_INR || 90.04} • AED/INR {rates.AED_INR || 22.64}</Text>
      </View>
      <Text className="mb-3 text-lg font-black text-white">Recent transactions</Text>
      {transactions.slice(0, 3).map((transaction) => <TransactionCard key={transaction.id} transaction={transaction} onPress={() => router.push(`/transactions/${transaction.id}`)} />)}
    </Screen>
  );
}
