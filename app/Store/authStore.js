import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const webStorage = {
  getItem: async (name) =>
    typeof window !== "undefined" ? window.localStorage.getItem(name) : null,

  setItem: async (name, value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(name, value);
    }
  },

  removeItem: async (name) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(name);
    }
  },
};

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      isLogin: false,
      isCompleted: false,
       userAccepted: null, // 👈 add your custom stored value

        login: (userAccepted) =>
        set({
          isLogin: true,
          userAccepted: userAccepted, // 👈 stored automatically in SecureStore / localStorage
        }),

      logout: () =>
        set({
          isLogin: false,
          userAccepted: null, // optional: clear it
        }),

      markDossierIncomplete: () => set({ isCompleted: false }),
      markDossierCompleted: () => set({ isCompleted: true }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() =>
        Platform.OS === "web" ? webStorage : secureStorage
      ),
    }
  )
);
