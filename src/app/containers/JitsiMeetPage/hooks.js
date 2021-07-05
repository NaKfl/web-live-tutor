/* eslint-disable react-hooks/exhaustive-deps */
import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import queryString from 'query-string';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import socket from 'utils/socket';
import isOnMobileDevice from 'utils/mobileDetect';
import { useTranslation } from 'react-i18next';
import { DATE_TIME_FORMAT } from 'utils/constants';
import {
  storeParticipantJoin,
  getValueParticipantJoin,
  removeParticipantJoin,
} from 'utils/localStorageUtils';

const useHooks = props => {
  const { t } = useTranslation();
  const { token } = queryString.parse(props.location.search);
  const history = useHistory();
  const [roomInfo, setRoomInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isContinueWeb, setIsContinueWeb] = useState(false);
  const isOnMobile = isOnMobileDevice();
  const childJitsiRef = useRef();

  const pushToHome = isTutor => {
    setIsLoading(true);
    removeParticipantJoin();
    setTimeout(() => {
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
      const {
        roomName,
        isTutor,
        userCall,
        userBeCalled,
        startTime,
        endSession,
      } = data;

      if (moment().isAfter(moment(startTime).add(-5, 'minutes'))) {
        socket.emit('call:setStatusCalling', {
          userId: userBeCalled.id,
          status: true,
        });
        let duration = moment.duration(moment(endSession).diff(moment()));
        let remainTime = duration.asSeconds();
        let totalTime = moment
          .duration(moment(endSession).diff(moment(startTime)))
          .asSeconds();
        setRoomInfo({
          userCall,
          roomName,
          userBeCalled,
          isTutor,
          startTime,
          token,
          remainTime,
          totalTime,
        });
      } else {
        setError(
          t('Jitsi.invalidTime', {
            time: moment(startTime).format(DATE_TIME_FORMAT),
          }),
        );
        pushToHome(roomInfo.isTutor);
      }
    }
  }, []);

  const handleParticipantJoin = () => {
    storeParticipantJoin(true);
  };

  const handleSomeOneLeave = useCallback(field => {
    console.log('Participant leave!');
  }, []);

  const endCall = field => {
    const { userCall, userBeCalled, startTime } = field;
    const endTime = moment();
    const number = childJitsiRef.current.getNumberOfPersons();
    const isParticipantJoin = getValueParticipantJoin();

    if (number === 0 && isParticipantJoin) {
      socket.emit('call:endCall', {
        userCall,
        userBeCalled,
        startTime,
        endTime,
      });
    }
    if (roomInfo.isTutor) {
      socket.emit('call:setStatusCalling', {
        userId: userBeCalled.id,
        status: false,
      });
    }
    pushToHome(roomInfo.isTutor);
  };

  const continueGoToWeb = () => {
    setIsContinueWeb(true);
  };

  return {
    handlers: {
      handleSomeOneLeave,
      endCall,
      continueGoToWeb,
      pushToHome,
      handleParticipantJoin,
    },
    selectors: {
      roomInfo,
      isLoading,
      isOnMobile,
      error,
      token,
      isContinueWeb,
      childJitsiRef,
    },
  };
};

export default useHooks;
