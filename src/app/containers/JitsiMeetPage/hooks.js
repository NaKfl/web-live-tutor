import moment from 'moment';
import { useState, useEffect, useCallback } from 'react';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'configs';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

const useHooks = props => {
  const { token } = queryString.parse(props.location.search);
  const history = useHistory();
  const [roomInfo, setRoomInfo] = useState({});

  useEffect(() => {
    const { roomName, password, displayName, isTutor } = jwt.verify(
      token,
      JWT_SECRET,
    );
    console.log('roomName', roomName, password);
    console.log('token', token);
    setRoomInfo({
      roomName,
      password,
      displayName,
      isTutor,
    });
  }, []);

  const handleSomeOneLeave = useCallback(() => {
    history.push('/');
  }, []);

  return {
    handlers: { handleSomeOneLeave },
    selectors: { roomInfo },
  };
};

export default useHooks;
