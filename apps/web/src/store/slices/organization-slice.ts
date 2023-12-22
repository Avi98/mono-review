import { StateCreator } from "zustand";

export type OrganizationSlice = {};

export const createOrganization: StateCreator<OrganizationSlice> = (set) => ({
  organization: null,
});
