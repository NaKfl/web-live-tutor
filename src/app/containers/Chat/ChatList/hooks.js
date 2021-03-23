import { useCallback, useEffect, useState } from 'react';
import socket from 'utils/socket';

const useHooks = () => {
  const [togglePopup, setTogglePopup] = useState(false);
  const [recentList, setRecentList] = useState([]);

  useEffect(() => {
    socket.emit('chat:getRecentList');
  }, []);

  useEffect(() => {
    socket.on('chat:returnRecentList', ({ recentList }) => {
      setRecentList(recentList);
    });
  }, []);

  const handleShowHidePopup = useCallback(() => {
    setTogglePopup(prevState => !prevState);
  }, []);

  return {
    handlers: { handleShowHidePopup },
    selectors: {
      togglePopup,
      recentList,
    },
  };
};

export default useHooks;
