import { Image, Text, View } from "react-native";
import React from "react";

export default function Logo({ withText = true }: { withText?: boolean }) {
  return (
    <View className="flex flex-row items-center text-center space-x-1 ">
      <Image
        resizeMode="contain"
        source={require("../assets/images/logo.png")}
        alt="logo"
      />
      {withText && (
        <Text className="text-[37px] font-pbold text-white">Tora</Text>
      )}
    </View>
  );
}
