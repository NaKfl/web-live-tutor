import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const useHooks = props => {
  const history = useHistory();
  const handleAcceptCall = ({ userCall }) => {
    socket.emit('call:acceptCall', { userId: userCall.id });
    const user = getUserFromStorage();
    const token = jwt.sign(
      {
        roomName: userCall.id,
        password: userCall.id,
        displayName: user.name,
        isTutor: false,
      },
      JWT_SECRET,
    );
    console.log('token', token);
    history.push(`/call/?token=${token}`);
  };
  const handleRejectCall = ({ userId }) => {};
  return {
    handlers: { handleAcceptCall, handleRejectCall },
    selectors: {},
  };
};

export default useHooks;
