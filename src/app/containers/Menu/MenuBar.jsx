import React, { memo } from 'react';
import { Popover } from 'antd';
import Button from 'app/components/Button';
import { MenuBarListItem } from './constants';
import { Link } from 'react-router-dom';
import { useHooks, useUnmount } from './hooks';
import { useTranslation } from 'react-i18next';
import { StyledMenuBar } from './styles';

const MenuBar = () => {
  const { selectors, handlers } = useHooks();
  const { t } = useTranslation();

  const { itemActived, menuActived } = selectors;
  const { onActiveMenu } = handlers;

  useUnmount();

  return (
    <StyledMenuBar>
      <ul className="menu-list">
        {MenuBarListItem.map(menu => (
          <li>
            <Popover
              trigger="click hover"
              placement="bottomLeft"
              content={
                <ul className="item-list">
                  {menu.contents.map((item, index) => (
                    <li
                      className={`item ${
                        itemActived === item.name && 'item-active'
                      }`}
                    >
                      <Link
                        className="item-link"
                        to={item.route}
                        onClick={() => onActiveMenu(menu.name, item.name)}
                      >
                        {t(item.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              }
              overlayClassName="menu-item-popover"
            >
              <Button
                className={`item-btn ${
                  menuActived === menu.name ? 'btn-active' : ''
                }`}
                type="primary"
              >
                <span className="menu-title"> {t(menu.title)}</span>
              </Button>
            </Popover>
          </li>
        ))}
      </ul>
    </StyledMenuBar>
  );
};

export default memo(MenuBar);
