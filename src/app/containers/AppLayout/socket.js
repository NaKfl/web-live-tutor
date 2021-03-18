import socket from 'utils/socket';

export const emitIdentity = user => {
  socket.emit('identity', { user });
};

export const emitLogout = () => {
  socket.emit('logout');
};
