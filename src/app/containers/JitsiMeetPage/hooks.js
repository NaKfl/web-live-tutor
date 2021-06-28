/* eslint-disable react-hooks/exhaustive-deps */
import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import socket from 'utils/socket';
import isOnMobileDevice from 'utils/mobileDetect';
import { useTranslation } from 'react-i18next';

const useHooks = props => {
  const { t } = useTranslation();
  const { token } = queryString.parse(props.location.search);
  const history = useHistory();
  const [roomInfo, setRoomInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isContinueWeb, setIsContinueWeb] = useState(false);
  const isOnMobile = isOnMobileDevice();
  let myTimeOut;

  const pushToHome = isTutor => {
    myTimeOut = setTimeout(() => {
      if (isTutor) history.push('/schedule-tutor');
      else history.push('/');
    }, 3000);
  };

  useEffect(() => {
    if (!token) {
      setError(t('Jitsi.invalidToken'));
      return pushToHome();
    }

    const data = (() => {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
      } catch (error) {
        setError(t('Jitsi.invalidToken'));
        pushToHome();
        return null;
      }
    })();

    if (data) {
      const { roomName, isTutor, userCall, userBeCalled, startTime } = data;

      if (moment().isAfter(moment(startTime).add(-5, 'minutes'))) {
        socket.emit('call:setStatusCalling', {
          userId: userBeCalled.id,
        });
        setRoomInfo({
          userCall,
          roomName,
          userBeCalled,
          isTutor,
          startTime,
          token,
        });
      } else {
        setError(
          t('Jitsi.invalidTime', {
            time: moment(startTime).format('DD-MM-YYYY HH:mm'),
          }),
        );
        pushToHome(roomInfo.isTutor);
      }
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

  const continueGoToWeb = () => {
    setIsContinueWeb(true);
  };

  return {
    handlers: { handleSomeOneLeave, endCall, continueGoToWeb },
    selectors: { roomInfo, isLoading, isOnMobile, error, token, isContinueWeb },
  };
};

export default useHooks;
