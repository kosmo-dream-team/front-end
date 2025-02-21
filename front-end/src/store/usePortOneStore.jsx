import { create } from "zustand";

/*
  포트원(아임포트) 결제를 위한 필수 정보들을 저장하는 store입니다.
  기부하는 유저의 정보는 useUserProfile에서 가지고 올 수 있으니 추가하지 않습니다.
*/ 
const usePortOneStore = create((set) => ({
  initInfo: { // 포트원 SDK 초기화를 위한 정보
    impKey: "imp24435787" // 연동 된 서비스(dream-on)의 고객사 식별코드
  },
  paymentInfo: { // 포트원 연동 결제를 위한 정보
    channelKey: "channel-key-ee27fa89-f49b-414d-81e5-b8f57e614c5e", // 포트원에서 연동 된 결제 채널의 키 값
    pay_method: "card", // 결제 수단
    merchant_uid: "order_no_0001", // 주문 마다 다른 값이 설정 되어야 함
    name: "결제 테스트", // 결제 화면에서 보여질 이름
    amount: 1 // 결제 금액
  },
  setPaymentInfo: (newPaymentInfo) => set((state) => ({ paymentInfo: { ...state.paymentInfo, ...newPaymentInfo } })) // 결제정보 변경을 위한 함수
}));

export default usePortOneStore;