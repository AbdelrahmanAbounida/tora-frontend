import { View, Text } from "react-native";
import React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <View>
      <Text className="text-red-500  text-[11px]">{message}</Text>
    </View>
  );
}
