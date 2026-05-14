import { Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { useNotificationStore } from "@/store/notificationStore";
import { formatDate } from "@/lib/format";

export default function MyTicketsScreen() {
  const tickets = useNotificationStore((state) => state.tickets);
  return (
    <Screen>
      <ScreenHeader title="My tickets" subtitle="Support ticket history." />
      {tickets.map((ticket) => (
        <View key={ticket.id} className="mb-3 rounded-2xl bg-navy-900 p-4">
          <StatusBadge label={ticket.status} />
          <Text className="mt-3 text-base font-bold text-white">{ticket.subject}</Text>
          <Text className="mt-1 text-xs text-slate-400">{formatDate(ticket.createdAt)}</Text>
        </View>
      ))}
    </Screen>
  );
}
