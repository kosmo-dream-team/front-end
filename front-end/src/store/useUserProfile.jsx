import axios from "axios";
import create from "zustand";

const useUserProfile = create((set) => ({
  userProfile: null,

  fetchUserProfile: async () => {
    const response = await axios.get("/api/user-profile");
    set({ userProfile: response.data });

    console.log(response.date);
  },
}));

export default useUserProfile;
