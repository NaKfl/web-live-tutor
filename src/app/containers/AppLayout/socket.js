import socket from 'utils/socket';

export const emitConnectionLogin = user => {
  socket.emit('connection:login', { user });
};

export const emitDisconnectionLogout = () => {
  socket.emit('disconnection:logout');
};
