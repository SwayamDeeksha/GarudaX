import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/useTheme";

export function Screen({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  const theme = useTheme();

  const content = (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 32,
        paddingTop: 16,
        backgroundColor: theme.background,
      }}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {scroll ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}