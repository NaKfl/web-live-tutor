import { WEB_API } from 'configs';
import io from 'socket.io-client';

const socket = io(WEB_API, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

export default socket;
