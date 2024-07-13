import { useModal } from "@/hooks/use-modal";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";

const SuccessMessageModal = () => {
  const { isSuccessModalOpen, setIsSuccessModalOpen } = useModal();
  return (
    <View>
      <Modal
        isVisible={isSuccessModalOpen}
        onBackdropPress={() => setIsSuccessModalOpen(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={{ height: 200, backgroundColor: "green" }}>
          <Text className="text-white">SuccessMessageModal</Text>
        </View>
      </Modal>
    </View>
  );
};

export default SuccessMessageModal;
