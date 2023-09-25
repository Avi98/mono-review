export const getFullNameInitials = (fullName: string) => {
  const words = fullName.trim().split(" ");

  let initials = "";
  for (const w of words) {
    initials += w[0];
  }
  return initials;
};
