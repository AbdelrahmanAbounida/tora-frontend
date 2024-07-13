import ConfirmVerifyEmailModal from "@/components/modals/confirm-verify-email-modal";
import OtpModal from "@/components/modals/otp-modal";
import SuccessMessageModal from "@/components/modals/success-msg-modal";
import React from "react";

const ModalProviders = () => {
  return (
    <>
      <OtpModal />
      <SuccessMessageModal />
      <ConfirmVerifyEmailModal />
    </>
  );
};

export default ModalProviders;
