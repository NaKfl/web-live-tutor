import { useCallback, useState, useEffect } from 'react';
import socket from 'utils/socket';

const useHooks = () => {
  const [togglePopup, setTogglePopup] = useState(false);
  const [unreadCount, setUnreadCount] = useState(false);

  useEffect(() => {
    socket.emit('chat:getRecentList');
  }, []);

  useEffect(() => {
    socket.on('chat:returnRecentList', ({ unreadCount }) => {
      setUnreadCount(unreadCount);
    });
  }, []);

  const handleShowHidePopup = useCallback(() => {
    setTogglePopup(prevState => !prevState);
  }, []);

  return {
    handlers: { handleShowHidePopup },
    selectors: {
      togglePopup,
      unreadCount,
    },
  };
};

export default useHooks;
