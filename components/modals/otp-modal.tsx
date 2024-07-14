import { useModal } from "@/hooks/use-modal";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Modal from "react-native-modal";
import { OtpInput } from "react-native-otp-entry";
import CustomButton from "../custom-button";
import { useStore } from "@/hooks/use-store";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { AuthContext } from "@/providers/auth-context";

const OtpModal = () => {
  const { setIsSuccessModalOpen, isOtpModalOpen, setIsOtpModalOpen } =
    useModal();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { setAccessToken, setRefreshToken } = authContext;

  const [verifyLoading, setverifyLoading] = useState(false);
  const [currentOTP, setcurrentOTP] = useState("");
  const { currentUserEmail } = useStore();
  const toast = useToast();
  const router = useRouter();

  const verifyOtp = async (otp: string) => {
    setverifyLoading(true);

    try {
      // const resp = await ApiManager.post("/api/auth/request-verify-otp", {
      //   email: currentUserEmail,
      //   otpValue: "123145",
      // });

      const resp = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_BACKEND_URL}/api/auth/request-verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUserEmail,
            otpValue: otp,
          }),
        }
      );

      const data = await resp.json();

      if (data?.error || (data?.statusCode && data?.statusCode !== 200)) {
        toast.show(data?.message, {
          type: "danger",
          placement: "top",
          duration: 5000,
        });
      } else {
        // login user
        const { accessToken, refreshToken } = data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsOtpModalOpen(false);
        setIsSuccessModalOpen(true);
        router.push("/(tabs)/home");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setverifyLoading(false);
    }
  };

  return (
    <View>
      <Modal
        isVisible={isOtpModalOpen}
        // onBackdropPress={() => setIsOtpModalOpen(false)}
      >
        <View
          style={{
            height: 230,
            backgroundColor: "#fff",
            borderRadius: 17,
            padding: 20,
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text className="font-pextrabold text-xl  w-full text-center">
            Enter OTP
          </Text>
          <Text className="text-medium mb-6 text-gray-700">
            Enter the OTP sent to your email address
          </Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => setcurrentOTP(text)}
            onFilled={(text) => verifyOtp(text)}
            focusColor="orange"
            focusStickBlinkingDuration={500}
          />

          <View className="flex flex-row justify-between gap-4 mt-1 items-center ">
            <CustomButton
              disabled={verifyLoading}
              onClick={() => {
                setIsOtpModalOpen(false);
              }}
              variant={"outline"}
              title="Cancel"
              className="w-[45%] mt-4"
            />
            {verifyLoading ? (
              <ActivityIndicator
                className="bg-primary w-[45%] py-3 mt-4 rounded-lg"
                size="small"
                color="#fff"
              />
            ) : (
              <CustomButton
                disabled={verifyLoading || currentOTP.length !== 6}
                onClick={() => {
                  if (currentOTP.length == 6) {
                    verifyOtp(currentOTP);
                  }
                }}
                variant={"default"}
                title="Verify"
                className="w-[45%] mt-4"
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OtpModal;
