import React, { memo } from 'react';
import { useGetUserInfo } from './hooks';

export const checkPermissions = (role, requiredRoles) => {
  if (!role) {
    return false;
  }

  return requiredRoles.includes(role);
};

export const Can = ({ yes, no = () => null, requiredRoles }) => {
  const { user } = useGetUserInfo();

  return (
    <>{checkPermissions(user?.currentRole, requiredRoles) ? yes() : no()}</>
  );
};

export default memo(Can);
