import { StateCreator } from "zustand";

export type OrganizationSlice = {
  currentOrgId: string | null;
};

export const createOrganization: StateCreator<OrganizationSlice> = (set) => ({
  //@TODO remove it once the org screen is hooked
  currentOrgId: "83f008f8-87e4-4e3f-89c7-595cdb04287e",
});
