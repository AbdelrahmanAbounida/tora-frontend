import { View, Text, ScrollView, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom-button";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Logo from "@/components/logo";
import { AuthContext } from "@/providers/auth-context";

export default function Onboard() {
  const router = useRouter();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { accessToken } = authContext;

  useEffect(() => {
    if (accessToken) {
      router.replace("/(tabs)/home");
    }
  }, [accessToken]);

  return (
    <SafeAreaView className="bg-dark h-full">
      <ScrollView className="h-full">
        <View className=" h-full flex items-center justify-center p-3 mt-3 mx-1">
          {/** logo */}
          <Logo />

          {/** image  */}
          <Image
            className="mt-5"
            resizeMode="contain"
            source={require("../assets/images/onboard.png")}
            alt="logo"
          />

          {/** title */}
          <View className=" mt-4 w-full">
            <Text className="font-pbold text-[29px] text-[#fff] text-center flex-1 ">
              Discover Endless Possibilities with {""}
              <Text className="text-primary font-extrabold text-[30px]">
                Tora
              </Text>
            </Text>

            <Image
              className="absolute bottom-0 right-0 w-[65px] h-[28px]"
              resizeMode="contain"
              source={require("../assets/images/path.png")}
              alt="logo"
            />
          </View>

          {/** subtitle */}
          <Text className="text-secondary font-pregular text-center text-[14px]">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Tora
          </Text>

          {/** button */}
          <CustomButton
            style={{ marginTop: 20 }}
            title="Continue with Email"
            onClick={() => router.replace("/(tabs)/home")}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="" style="dark" />
    </SafeAreaView>
  );
}
