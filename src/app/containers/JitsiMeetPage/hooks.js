import { useState, useEffect, useCallback } from 'react';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'configs';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { actions } from './slice';
import useActions from 'hooks/useActions';
import moment from 'moment';

const useHooks = props => {
  const { endCall } = useActions(
    {
      endCall: actions.endCall,
    },
    [actions],
  );
  const { token } = queryString.parse(props.location.search);
  const history = useHistory();
  const [roomInfo, setRoomInfo] = useState({});

  useEffect(() => {
    const {
      roomName,
      password,
      displayName,
      isTutor,
      participantId,
      startTime,
    } = jwt.verify(token, JWT_SECRET);
    setRoomInfo({
      participantId,
      roomName,
      password,
      displayName,
      isTutor,
      startTime,
    });
  }, [token]);

  const handleSomeOneLeave = useCallback(
    field => {
      if (field.isTutor) {
        return history.push('/');
      }
      const endCallField = {
        studentId: field.participantId,
        tutorId: field.roomName,
        startTime: field.startTime,
        endTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      };
      endCall(endCallField);
      history.push('/');
    },
    [endCall, history],
  );

  return {
    handlers: { handleSomeOneLeave },
    selectors: { roomInfo },
  };
};

export default useHooks;
