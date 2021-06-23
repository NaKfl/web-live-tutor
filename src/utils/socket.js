import { WEB_API } from 'configs';
import io from 'socket.io-client';

const socket = io(WEB_API, {
  withCredentials: true,
});

export default socket;
