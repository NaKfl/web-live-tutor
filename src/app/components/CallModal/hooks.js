import moment from 'moment';
import socket from 'utils/socket';

export const useHooks = props => {
  const handleAcceptCall = ({ userCall }) => {
    const startTime = moment().format('YYYY-MM-DD HH:mm:ss');
    socket.emit('call:acceptCall', { userId: userCall.id, startTime });
    props.onCancel();
  };
  const handleRejectCall = ({ userCall }) => {
    socket.emit('call:cancelCall', { userId: userCall.id });
  };

  const handleSelfCancelCall = ({ userCall }) => {
    socket.emit('call:selfCancelCall', { userId: userCall.id });
  };

  return {
    handlers: { handleAcceptCall, handleRejectCall, handleSelfCancelCall },
    selectors: {},
  };
};

export default useHooks;
