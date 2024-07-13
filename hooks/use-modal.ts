import { create } from "zustand";

type ModalStore = {
  isVerifyEmailModalOpen: boolean;
  isResetPasswordModalOpen: boolean;
  isOtpModalOpen: boolean;
  isSuccessModalOpen: boolean;

  setIsVerifyEmailModalOpen: (isOpen: boolean) => void;
  setIsResetPasswordModalOpen: (isOpen: boolean) => void;
  setIsOtpModalOpen: (isOpen: boolean) => void;
  setIsSuccessModalOpen: (isOpen: boolean) => void;
};

export const useModal = create<ModalStore>((set) => ({
  isVerifyEmailModalOpen: false,
  isResetPasswordModalOpen: false,
  isOtpModalOpen: false,
  isSuccessModalOpen: false,

  setIsVerifyEmailModalOpen: (isOpen: boolean) =>
    set({ isVerifyEmailModalOpen: isOpen }),
  setIsResetPasswordModalOpen: (isOpen: boolean) =>
    set({ isResetPasswordModalOpen: isOpen }),
  setIsOtpModalOpen: (isOpen: boolean) => set({ isOtpModalOpen: isOpen }),
  setIsSuccessModalOpen: (isOpen: boolean) =>
    set({ isSuccessModalOpen: isOpen }),
}));
