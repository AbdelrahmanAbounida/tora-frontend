import { useModal } from "@/hooks/use-modal";
import React from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";

const ConfirmVerifyEmailModal = () => {
  const { isVerifyEmailModalOpen, setIsVerifyEmailModalOpen } = useModal();
  return (
    <View>
      <Modal
        isVisible={isVerifyEmailModalOpen}
        onBackdropPress={() => setIsVerifyEmailModalOpen(false)}
      >
        <View style={{ flex: 1 }}>
          <Text>ConfirmVerifyEmailModal</Text>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmVerifyEmailModal;
