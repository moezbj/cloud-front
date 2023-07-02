export const ROLE = {
  ADMIN: "admin",
  RESPONSABLE: "responsable",
  CLIENT: "Client",
};

const privileges = {
  [ROLE.ADMIN]: [ROLE.ADMIN],
  [ROLE.RESPONSABLE]: [ROLE.RESPONSABLE],
  [ROLE.CLIENT]: [ROLE.CLIENT],
};

function isValidROLE(role, user) {
  return (
    role === user?.role ||
    Boolean(privileges[role]?.find((r) => r === user?.role))
  );
}

export function isUserAuthenticated(user, roles) {
  if (!user && roles.length) return false;
  if (roles.length && roles.find((r) => isValidROLE(r, user))) return false;
  return true;
}
