import { useCallback, useEffect, useState } from 'react';
import socket from 'utils/socket';

const useHooks = () => {
  const [recentList, setRecentList] = useState([]);
  const [activatedConversation, setActivatedConversation] = useState({});

  useEffect(() => {
    socket.emit('chat:getRecentList');
  }, []);

  useEffect(() => {
    socket.on('chat:returnRecentList', ({ recentList }) => {
      setRecentList(recentList);
      setActivatedConversation(recentList[0]);
    });
  }, []);

  const handleChangeConversation = useCallback(conversation => {
    setActivatedConversation(conversation);
  }, []);

  return {
    handlers: { handleChangeConversation },
    selectors: {
      recentList,
      activatedConversation,
    },
  };
};

export default useHooks;
