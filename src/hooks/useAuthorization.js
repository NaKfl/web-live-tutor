export const useAuthorization = (role, requiredRoles = []) => {
  return requiredRoles.length && requiredRoles.includes(role);
};
