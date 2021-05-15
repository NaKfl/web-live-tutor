import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const useHooks = props => {
  const handleAcceptCall = ({ userCall }) => {
    const startTime = moment().format('YYYY-MM-DD hh:mm:ss');
    socket.emit('call:acceptCall', { userId: userCall.id, startTime });
    props.onCancel();
  };
  const handleRejectCall = ({ userCall }) => {
    socket.emit('call:cancelCall', { userId: userCall.id });
  };
  return {
    handlers: { handleAcceptCall, handleRejectCall },
    selectors: {},
  };
};

export default useHooks;
