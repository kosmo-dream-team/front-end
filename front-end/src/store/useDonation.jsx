// src/store/donationStore.js
import { create } from 'zustand';

export const useDonationStore = create((set) => ({
  donationData: {
    category: '',
    title: '',
    content: '',
    targetAmount: '',
    deadline: '',
    beneficiaryName: '',
    beneficiaryContact: '',
    attachment: null,
    status: '대기중'
  },
  setDonationData: (data) =>
    set((state) => ({ donationData: { ...state.donationData, ...data } })),
  resetDonationData: () =>
    set(() => ({
      donationData: {
        category: '',
        title: '',
        content: '',
        targetAmount: '',
        deadline: '',
        beneficiaryName: '',
        beneficiaryContact: '',
        attachment: null,
        status: '대기중'
      }
    })),
}));
