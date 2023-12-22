export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  photo: string;
  email: string;
  source: string;
  organizations: Organization[];
  ownedOrganizations: OwnedOrganization[];
}

export interface Organization {
  id: string;
  isOwner: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface OwnedOrganization {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
