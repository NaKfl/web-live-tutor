import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsShow, selectUnreadCount, selectRecentList } from './selectors';
import useActions from 'hooks/useActions';
import { actions } from './slice';
import socket from 'utils/socket';

const useHooks = () => {
  const isShow = useSelector(selectIsShow);
  const unreadCount = useSelector(selectUnreadCount);

  const { toggleChatPopup, setUnreadCount, setRecentList } = useActions(
    {
      toggleChatPopup: actions.toggleChatPopup,
      setUnreadCount: actions.setUnreadCount,
      setRecentList: actions.setRecentList,
    },
    [actions],
  );

  useEffect(() => {
    socket.emit('chat:getRecentList');
  }, []);

  useEffect(() => {
    socket.on('chat:returnRecentList', ({ recentList, unreadCount }) => {
      setRecentList(recentList);
      setUnreadCount(unreadCount);
    });
  }, [setUnreadCount, setRecentList]);

  const handleShowHidePopup = useCallback(() => {
    toggleChatPopup();
  }, [toggleChatPopup]);

  return {
    handlers: { handleShowHidePopup },
    selectors: {
      isShow,
      unreadCount,
    },
  };
};

export const useControlChatPopup = () => {
  const recentList = useSelector(selectRecentList);

  const {
    openChatPopup,
    setNewConversation,
    setActivatedConversation,
    deleteNewConversation,
  } = useActions(
    {
      openChatPopup: actions.openChatPopup,
      setNewConversation: actions.setNewConversation,
      setActivatedConversation: actions.setActivatedConversation,
      deleteNewConversation: actions.deleteNewConversation,
    },
    [actions],
  );

  const handleShowChatPopup = useCallback(() => {
    openChatPopup();
  }, [openChatPopup]);

  const handleSetNewConversation = useCallback(
    tutor => {
      handleShowChatPopup();
      const { userId, name, avatar } = tutor;
      const formattedPartner = { partner: { id: userId, name, avatar } };
      const existedConversation = recentList?.find(
        item => item?.partner?.id === userId,
      );
      if (existedConversation) {
        setActivatedConversation(existedConversation);
        deleteNewConversation();
      } else {
        setNewConversation(formattedPartner);
        setActivatedConversation(formattedPartner);
      }
    },
    [
      handleShowChatPopup,
      recentList,
      setActivatedConversation,
      setNewConversation,
      deleteNewConversation,
    ],
  );

  return { handleShowChatPopup, handleSetNewConversation };
};

export default useHooks;
