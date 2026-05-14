import { useEffect } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useNotificationStore } from "@/store/notificationStore";
import { formatDate } from "@/lib/format";

export default function NotificationsScreen() {
  const notifications = useNotificationStore((state) => state.notifications);
  const loadNotifications = useNotificationStore((state) => state.loadNotifications);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <Screen>
      <ScreenHeader title="Notifications" subtitle="KYC, transfer, payment, review, and refund alerts." />
      {notifications.map((item) => (
        <View key={item.id} className="mb-3 rounded-2xl border border-white/10 bg-navy-900 p-4">
          <View className="flex-row items-start justify-between">
            <Text className="flex-1 text-base font-bold text-white">{item.title}</Text>
            {!item.read ? <View className="h-3 w-3 rounded-full bg-gold-500" /> : null}
          </View>
          <Text className="mt-1 text-sm text-slate-300">{item.body}</Text>
          <Text className="mt-3 text-xs text-slate-500">{formatDate(item.createdAt)}</Text>
        </View>
      ))}
    </Screen>
  );
}
