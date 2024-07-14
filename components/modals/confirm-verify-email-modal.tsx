import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import React from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../custom-button";

const ConfirmVerifyEmailModal = () => {
  const {
    isVerifyEmailModalOpen,
    setIsVerifyEmailModalOpen,
    setIsOtpModalOpen,
  } = useModal();
  const { currentUserEmail } = useStore();
  return (
    <View className="">
      <Modal
        isVisible={isVerifyEmailModalOpen}
        // onBackdropPress={() => setIsVerifyEmailModalOpen(false)}
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
          <Text className="text-[16px] font-semibold">
            Verify Your Email Address
          </Text>
          <Text className="font-bold text-[16px] py-3 font-pbold">
            {currentUserEmail || "asdasdasd"}
          </Text>

          <Text className="text-center text-[15px] leading-5 text-gray-600">
            A verification email has been sent to your email address. Please
            verify your email address to continue.
          </Text>

          <View className="flex flex-row justify-between gap-4 mt-1 items-center ">
            <CustomButton
              className="w-[45%] "
              variant={"outline"}
              title="Cancel"
              onClick={() => setIsVerifyEmailModalOpen(false)}
            />
            <CustomButton
              className="w-[45%]"
              variant={"default"}
              title="Next"
              onClick={() => {
                setIsVerifyEmailModalOpen(false);
                setIsOtpModalOpen(true);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmVerifyEmailModal;
