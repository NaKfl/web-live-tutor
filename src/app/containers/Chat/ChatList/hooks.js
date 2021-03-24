import { useCallback, useEffect, useState } from 'react';
import socket from 'utils/socket';

const useHooks = () => {
  const [recentList, setRecentList] = useState([]);
  const [activatedConversation, setActivatedConversation] = useState(null);

  useEffect(() => {
    socket.emit('chat:getRecentList');
  }, []);

  useEffect(() => {
    socket.on('chat:returnRecentList', ({ recentList }) => {
      setRecentList(recentList);
      setActivatedConversation(prevState => {
        if (prevState === null) return recentList[0];
        return prevState;
      });
    });
  }, []);

  useEffect(() => {
    socket.on('chat:joinOrLeave', () => {
      socket.emit('chat:getRecentList');
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
