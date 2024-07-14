import { useModal } from "@/hooks/use-modal";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../custom-button";
import { useRouter } from "expo-router";

const SuccessMessageModal = () => {
  const { isSuccessModalOpen, setIsSuccessModalOpen } = useModal();
  const router = useRouter();
  return (
    <View>
      <Modal
        isVisible={isSuccessModalOpen}
        onBackdropPress={() => {
          setIsSuccessModalOpen(false);
          router.push("(tab)/home");
        }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
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
          {/** success icon */}
          <Text className="w-full flex items-center justify-center text-2xl font-pbold text-center">
            Account Created Successfully
          </Text>
          <Text className="text-medium mb-1 text-gray-700 text-center text-[17px]">
            Your account has been created successfully. Start using the app now.
          </Text>

          <CustomButton
            textClassName="text-white text-[15px] font-medium"
            title="Back to Home"
            onClick={() => {
              setIsSuccessModalOpen(false);
              router.push("(tabs)/home");
            }}
            className="w-full mt-4 bg-green-600"
          />
        </View>
      </Modal>
    </View>
  );
};

export default SuccessMessageModal;
