import { Image, Text, View } from "react-native";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={{ alignItems: "center" }}>
      
      <Image
        source={require("../../assets/logo.png")}
        style={{
          width: compact ? 60 : 100,
          height: compact ? 60 : 100,
          marginBottom: 16,
        }}
        resizeMode="contain"
      />

      {!compact && (
        <>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "white" }}>
            GarudaX
          </Text>

          <Text style={{ marginTop: 8, textAlign: "center", color: "#94A3B8" }}>
            Fast, secure, transparent global money transfers.
          </Text>
        </>
      )}
    </View>
  );
}