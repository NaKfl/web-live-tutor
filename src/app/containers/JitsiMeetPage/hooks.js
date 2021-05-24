import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import queryString from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import socket from 'utils/socket';

const useHooks = props => {
  const { token } = queryString.parse(props.location.search);
  const history = useHistory();
  const [roomInfo, setRoomInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {
      roomName,
      userInfo,
      isTutor,
      participantId,
      userCall,
      userBeCalled,
      startTime,
    } = jwt.verify(token, JWT_SECRET);
    setRoomInfo({
      participantId,
      roomName,
      userCall,
      userBeCalled,
      userInfo,
      isTutor,
      startTime,
    });
  }, [token]);

  const handleSomeOneLeave = useCallback(
    field => {
      const { userCall, userBeCalled, startTime } = field;
      socket.emit('call:endCall', {
        userCall,
        userBeCalled,
        startTime,
        endTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      });
      setIsLoading(true);
      setTimeout(() => {
        history.push('/');
      }, 3000);
    },
    [history],
  );

  return {
    handlers: { handleSomeOneLeave },
    selectors: { roomInfo, isLoading },
  };
};

export default useHooks;
