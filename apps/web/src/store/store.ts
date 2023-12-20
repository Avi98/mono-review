import { create } from "zustand";
import {
  UserSessionSlice,
  createUserSession,
} from "./slices/user-session-slice";

type StoreState = UserSessionSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createUserSession(...a),
}));
