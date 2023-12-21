import { StateCreator } from "zustand";
import { User } from "../../interfaces/IUserResponse";

export type UserStoreType = User;

export type UserSessionSlice = {
  user: UserStoreType | null;
  setUserSession: (user: UserStoreType) => void;
};

export const createUserSession: StateCreator<UserSessionSlice> = (set) => ({
  user: null,
  setUserSession: (user) => {
    set({ user });
  },
});
