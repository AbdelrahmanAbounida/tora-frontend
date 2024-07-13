import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Saved() {
  return (
    <SafeAreaView className="bg-dark h-full">
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className="text-primary font-bold text-xl">Saved</Text>
      </View>
    </SafeAreaView>
  );
}
