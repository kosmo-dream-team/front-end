import { create } from "zustand";

const useImageStore = create((set) => ({
  images: [],

  setImages: (newImages) => set({ images: newImages }),
}));

export default useImageStore;
