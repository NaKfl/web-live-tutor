import React, { memo } from 'react';
import useHooks from './hooks';

export const checkPermissions = (role, requiredRoles) => {
  if (!role) {
    return false;
  }

  return requiredRoles.includes(role);
};

export const Can = ({ yes, no = () => null, requiredRoles }) => {
  const { selectors } = useHooks();
  const { currentRole } = selectors;

  return <>{checkPermissions(currentRole, requiredRoles) ? yes() : no()}</>;
};

export default memo(Can);
