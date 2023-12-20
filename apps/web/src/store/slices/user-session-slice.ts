import { StateCreator } from "zustand";
import { getUserSession } from "../../../api/auth";

export type UserStoreType = {
  firstName: string;
  lastName: string;
  userId: string | number;
  isActive: boolean;
  email: string;
  ownedOrgs: string[];
  memberOrgs: string;
  isFetchingUserSession: boolean;
};

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
