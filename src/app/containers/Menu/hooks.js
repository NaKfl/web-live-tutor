import { useEffect, useState, useCallback } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';

import { actions } from './slice';

import {
  getSelectActiveMenu,
  getSelectActiveItem,
  getSelectIsSideNavOpen,
  getSelectChildrenMenusOpen,
} from './selectors';

export const useHooks = () => {
  const activeMenu = useSelector(getSelectActiveMenu);
  const activeItem = useSelector(getSelectActiveItem);
  const isSideNavOpen = useSelector(getSelectIsSideNavOpen);
  const childrenMenusOpen = useSelector(getSelectChildrenMenusOpen);

  const [menuActived, setItemActive] = useState(activeMenu);
  const [itemActived, setItemActived] = useState(activeItem);
  const [isSideMenuOpen, setIsSideNavOpen] = useState(isSideNavOpen);
  const [childrenMenusOpenList, setChildrenMenusOpenList] = useState(
    childrenMenusOpen,
  );

  const {
    fetchActiveMenu,
    fetchActiveItem,
    fetchSideNavOpen,
    fetchChildrenMenusOpen,
  } = useActions(
    {
      fetchActiveMenu: actions.fetchActiveMenu,
      fetchActiveItem: actions.fetchActiveItem,
      fetchSideNavOpen: actions.fetchSideNavOpen,
      fetchChildrenMenusOpen: actions.fetchChildrenMenusOpen,
    },
    [actions],
  );

  const onActiveMenu = useCallback(
    (menu, item) => {
      setItemActive(menu);
      setItemActived(item);
      fetchActiveMenu(menu);
      fetchActiveItem(item);
    },
    [setItemActive, setItemActived, fetchActiveMenu, fetchActiveItem],
  );

  const onOpenSideNav = useCallback(
    isOpen => {
      fetchSideNavOpen(isOpen);
      setIsSideNavOpen(isOpen);
    },
    [fetchSideNavOpen, setIsSideNavOpen],
  );

  const onOpenChildrenMenus = useCallback(
    menu => {
      let list = [];
      const index = childrenMenusOpenList.indexOf(menu);
      childrenMenusOpenList.forEach(element => {
        list.push(element);
      });

      index >= 0 ? list.splice(index, 1) : list.push(menu);
      setChildrenMenusOpenList(list);
      fetchChildrenMenusOpen(list);
    },
    [childrenMenusOpenList, setChildrenMenusOpenList, fetchChildrenMenusOpen],
  );

  const onClickHomeHandler = useCallback(() => {
    onActiveMenu('', '');
  }, [onActiveMenu]);

  useEffect(() => {
    setIsSideNavOpen(isSideNavOpen);
  }, [isSideNavOpen]);

  return {
    selectors: {
      menuActived,
      itemActived,
      isSideMenuOpen,
      childrenMenusOpenList,
    },
    handlers: {
      onActiveMenu,
      onOpenSideNav,
      onOpenChildrenMenus,
      onClickHomeHandler,
    },
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
