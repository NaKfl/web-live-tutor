import { useEffect } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actions } from './slice';
import { getActivatedMenu } from './selectors';
import { MenuBarListItems } from './constants';

export const useHooks = () => {
  const { pathname } = useLocation();
  const activatedMenu = useSelector(getActivatedMenu);

  const { setActivatedMenu } = useActions(
    {
      setActivatedMenu: actions.setActivatedMenu,
    },
    [actions],
  );

  useEffect(() => {
    if (pathname) {
      const menu = MenuBarListItems.find(item => item.path === pathname);
      setActivatedMenu(menu);
    }
  }, [pathname, setActivatedMenu]);

  return {
    selectors: {
      activatedMenu,
    },
    handlers: {},
  };
};

export const useUnmount = () => {
  const { resetState } = useActions(
    {
      resetState: actions.resetState,
    },
    [actions],
  );
  useEffect(() => () => resetState(), [resetState]);
};

export default useHooks;
