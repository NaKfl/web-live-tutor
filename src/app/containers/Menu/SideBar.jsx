import React from 'react';
import Button from 'app/components/Button';
import { MenuBarListItem } from './constants';
import { Link } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Can } from 'app/containers/AppLayout/Can';
import { useHooks } from './hooks';
import { useTranslation } from 'react-i18next';
import { AuthLogo } from 'app/components/AuthLogo';

const SideBar = () => {
  const { selectors, handlers } = useHooks();
  const { t } = useTranslation();

  const { itemActived, isSideMenuOpen, childrenMenusOpenList } = selectors;

  const {
    onActiveMenu,
    onOpenSideNav,
    onOpenChildrenMenus,
    onClickHomeHandler,
  } = handlers;

  return (
    <div
      className={`side-nav  ${
        isSideMenuOpen ? ' side-nav-open' : 'side-nav-close'
      }`}
      id="sideNav"
    >
      <div
        className="logo-wrapper logo-side-bar"
        onClick={() => onClickHomeHandler()}
      >
        <Link to="/" onClick={() => onOpenSideNav(false)}>
          <AuthLogo />
        </Link>
      </div>
      <hr />
      <Button className="close-btn" onClick={() => onOpenSideNav(false)}>
        <span className="close-icon">&times;</span>
      </Button>
      <ul className="menu-list">
        {MenuBarListItem.map(menu => (
          <Can
            key={menu.id}
            permissions={menu.permissions}
            yes={() => (
              <li className="menu-item ">
                <Button> {t(menu.title)}</Button>
                <UpOutlined
                  className={`menu-item-icon ${
                    childrenMenusOpenList.indexOf(menu.name) >= 0
                      ? 'menu-open'
                      : 'menu-close'
                  }`}
                  onClick={() => onOpenChildrenMenus(menu.name)}
                  id={menu.name + 'icon-down'}
                />

                <DownOutlined
                  id={menu.name + 'icon-up'}
                  className={`menu-item-icon ${
                    childrenMenusOpenList.indexOf(menu.name) < 0
                      ? 'menu-open'
                      : 'menu-close'
                  }`}
                  onClick={() => onOpenChildrenMenus(menu.name)}
                />
                <ul
                  id={menu.name}
                  className={`item-list ${
                    childrenMenusOpenList.indexOf(menu.name) >= 0
                      ? 'menu-open'
                      : 'menu-close'
                  }`}
                >
                  {menu.contents.map((item, index) => (
                    <Can
                      key={index}
                      permissions={item.permissions}
                      yes={() => (
                        <li
                          className={
                            itemActived === item.name ? 'item-active' : ''
                          }
                        >
                          <Button
                            onClick={() => onActiveMenu(menu.name, item.name)}
                          >
                            <Link
                              className="item-link"
                              to={item.route}
                              onClick={() => onOpenSideNav(false)}
                            >
                              {t(item.title)}
                            </Link>
                          </Button>
                        </li>
                      )}
                    />
                  ))}
                </ul>
              </li>
            )}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
