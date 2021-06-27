/* eslint-disable react-hooks/exhaustive-deps */
import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { notifyError } from 'utils/notify';
import socket from 'utils/socket';

const useHooks = props => {
  const { token } = queryString.parse(props.location.search);
  const history = useHistory();
  const [roomInfo, setRoomInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let myTimeOut;

  const pushToHome = isTutor => {
    myTimeOut = setTimeout(() => {
      if (isTutor) history.push('/schedule-tutor');
      else history.push('/');
    }, 3000);
  };

  useEffect(() => {
    const { roomName, isTutor, userCall, userBeCalled, startTime } = jwt.verify(
      token,
      JWT_SECRET,
    );
    if (moment().isAfter(moment(startTime))) {
      setRoomInfo({
        userCall,
        roomName,
        userBeCalled,
        isTutor,
        startTime,
        token,
      });
    } else {
      setIsLoading(true);
      notifyError(
        `Video Call will start on ${moment(startTime).format(
          'DD-MM-YYYY HH:mm',
        )}`,
      );
      pushToHome(roomInfo.isTutor);
    }
  }, [token, myTimeOut, roomInfo.isTutor]);

  const handleSomeOneLeave = field => {
    const { userCall, userBeCalled, startTime } = field;
    socket.emit('call:endCall', {
      userCall,
      userBeCalled,
      startTime,
      endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    setIsLoading(true);
    pushToHome(roomInfo.isTutor);
  };

  const endCall = () => {
    setIsLoading(true);
    pushToHome(roomInfo.isTutor);
  };

  return {
    handlers: { handleSomeOneLeave, endCall },
    selectors: { roomInfo, isLoading },
  };
};

export default useHooks;
