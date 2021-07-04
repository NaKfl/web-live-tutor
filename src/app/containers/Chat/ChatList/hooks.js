import useActions from 'hooks/useActions';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import socket from 'utils/socket';
import {
  selectActivatedConversation,
  selectNewConversation,
  selectRecentList,
} from '../selectors';
import { actions } from '../slice';

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
