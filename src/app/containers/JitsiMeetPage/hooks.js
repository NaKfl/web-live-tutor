import moment from 'moment';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'configs';
import queryString from 'query-string';
import socket from 'utils/socket';

const useHooks = props => {
  const { token } = queryString.parse(props.location.search);

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

  return {
    handlers: {},
    selectors: { roomInfo },
  };
};

export default useHooks;
