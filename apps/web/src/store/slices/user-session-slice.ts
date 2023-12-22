import { StateCreator } from "zustand";
import { getUserSession } from "../../../api/auth";
import { User } from "./types";

export type UserStoreType = User;

export type UserSessionSlice = {
  user: UserStoreType | null;
  fetchCurrentUserSession: () => Promise<void>;
};

export const createUserSession: StateCreator<UserSessionSlice> = (set) => ({
  user: null,
  fetchCurrentUserSession: async () => {
    const response = await getUserSession();
    set({ user: response as any });
  },
});
