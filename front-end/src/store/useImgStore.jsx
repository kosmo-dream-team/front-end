import { create } from "zustand";

//회원가입
const useImageStore = create((set) => ({
  images: [],

  setImages: (newImages) => set({ images: newImages }),
}));

export default useImageStore;
