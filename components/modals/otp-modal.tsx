import { useModal } from "@/hooks/use-modal";
import React from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";

const OtpModal = () => {
  const { isOtpModalOpen, setIsOtpModalOpen } = useModal();
  return (
    <View>
      <Modal
        isVisible={isOtpModalOpen}
        onBackdropPress={() => setIsOtpModalOpen(false)}
      >
        <View style={{ flex: 1 }}>
          <Text>OTP Modal</Text>
        </View>
      </Modal>
    </View>
  );
};

export default OtpModal;
