export class AlreadyInDB extends Error {
  name = 'AlreadyInDB';
}
export class NotInDB extends Error {
  name = 'NotInDB';
}
export class InValidPayload extends Error {
  name = 'InValidPayload';
}
export class InValidUserSession extends Error {
  name = 'InValidUserSession';
}
export class InValidRoleType extends Error {
  name = 'InValidRoleType';
}

export class DuplicateOrganization extends Error {
  name = 'DuplicateOrganization';
}
export class OrganizationNotFound extends Error {
  name = 'OrganizationNotFound';
}
