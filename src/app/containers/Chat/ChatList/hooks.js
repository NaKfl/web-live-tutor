import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectRecentList,
  selectActivatedConversation,
  selectNewConversation,
} from '../selectors';
import useActions from 'hooks/useActions';
import { actions } from '../slice';
import socket from 'utils/socket';

const useHooks = () => {
  const recentList = useSelector(selectRecentList);
  const activatedConversation = useSelector(selectActivatedConversation);
  const newConversation = useSelector(selectNewConversation);

  const { setActivatedConversation, deleteNewConversation } = useActions(
    {
      setActivatedConversation: actions.setActivatedConversation,
      deleteNewConversation: actions.deleteNewConversation,
    },
    [actions],
  );

  useEffect(() => {
    socket.on('chat:joinOrLeave', () => {
      socket.emit('chat:getRecentList');
    });
  }, []);

  const handleChangeConversation = useCallback(
    conversation => {
      setActivatedConversation(conversation);
      deleteNewConversation();
      socket.emit('chat:readMessage', { conversation });
    },
    [deleteNewConversation, setActivatedConversation],
  );

  const handleDeleteNewConversation = useCallback(
    (isSetDefaultActiveConversation = false) => {
      deleteNewConversation();
      if (isSetDefaultActiveConversation)
        setActivatedConversation(recentList[0]);
    },
    [deleteNewConversation, recentList, setActivatedConversation],
  );

  return {
    handlers: { handleChangeConversation, handleDeleteNewConversation },
    selectors: {
      recentList,
      activatedConversation,
      newConversation,
    },
  };
};

export default useHooks;
