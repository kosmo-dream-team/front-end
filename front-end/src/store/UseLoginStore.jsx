// src/stores/useImgStore.jsx
import { create } from "zustand";

const UseLoginStore = create((set) => ({
  login: "false",

  setLogin: (boolean) => set({ login: boolean }),
}));

export default UseLoginStore;
