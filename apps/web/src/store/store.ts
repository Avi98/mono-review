import { create } from "zustand";
import {
  createOrganization,
  createUserSession,
  type UserSessionSlice,
  type OrganizationSlice,
} from "./slices";

type StoreState = UserSessionSlice & OrganizationSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createUserSession(...a),
  ...createOrganization(...a),
}));
