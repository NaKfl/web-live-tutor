import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const useHooks = props => {
  const history = useHistory();
  const handleAcceptCall = ({ userCall }) => {
    const startTime = moment().format('YYYY-MM-DD hh:mm:ss');
    socket.emit('call:acceptCall', { userId: userCall.id, startTime });
    // const user = getUserFromStorage();
    // const token = jwt.sign(
    //   {
    //     participantId: user.id,
    //     roomName: userCall.id,
    //     password: userCall.id,
    //     displayName: user.name,
    //     jwtoken: userCall.id,
    //     isTutor: false,
    //     startTime,
    //   },
    //   JWT_SECRET,
    // );
    // history.push(`/call/?token=${token}`);
    props.onCancel();
  };
  const handleRejectCall = ({ userId }) => {};
  return {
    handlers: { handleAcceptCall, handleRejectCall },
    selectors: {},
  };
};

export default useHooks;
