import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { actions } from './slice';

const useHooks = () => {
  const [togglePopup, setTogglePopup] = useState(false);
  const { getRecentList } = useActions(
    {
      getRecentList: actions.getRecentList,
    },
    [actions],
  );

  useEffect(() => getRecentList(), [getRecentList]);

  const handleShowHidePopup = useCallback(() => {
    setTogglePopup(prevState => !prevState);
  }, []);

  return {
    handlers: { handleShowHidePopup },
    selectors: {
      togglePopup,
    },
  };
};

export default useHooks;
