import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TimelineStep } from "@/components/TimelineStep";
import { useTransferStore } from "@/store/transferStore";

const steps = ["Transfer Created", "Payment Received", "Compliance Check", "Processing", "Sent to Partner Bank", "Completed"];

export default function TransferTrackingScreen() {
  const { transferId } = useLocalSearchParams<{ transferId: string }>();
  const transaction = useTransferStore((state) => state.transactions.find((item) => item.id === transferId));
  const doneIndex = transaction?.status === "Completed" ? 5 : transaction?.status === "Payment Received" ? 1 : transaction?.status === "Compliance Review" ? 2 : 0;

  return (
    <Screen>
      <ScreenHeader title="Transfer tracking" subtitle={transaction?.reference || "Sandbox transfer timeline"} />
      {steps.map((step, index) => (
        <TimelineStep key={step} title={step} subtitle={index === 2 ? "AML, sanctions, and velocity checks placeholder." : undefined} done={index <= doneIndex} last={index === steps.length - 1} />
      ))}
    </Screen>
  );
}
