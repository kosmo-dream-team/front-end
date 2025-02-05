// src/stores/useImgStore.jsx
import { create } from "zustand";

const useImageStore = create((set) => ({
  images: [],
  // 필요에 따라 이미지를 업데이트하는 액션도 추가할 수 있습니다.
  setImages: (newImages) => set({ images: newImages }),
}));

export default useImageStore;
