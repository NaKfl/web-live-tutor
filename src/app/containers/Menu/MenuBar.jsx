import Can from 'app/containers/AppLayout/Can';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInjectReducer } from 'utils/reduxInjectors';
import { MenuBarListItems } from './constants';
import { useHooks } from './hooks';
import { reducer, sliceKey } from './slice';
import { StyledMenuBar } from './styles';

const MenuBar = () => {
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks();
  const { t } = useTranslation();

  const { activatedMenu } = selectors;

  return (
    <StyledMenuBar>
      <div className="menu-list">
        {MenuBarListItems.map(menu => (
          <Can
            key={menu.id}
            requiredRoles={menu.requiredRoles}
            yes={() => (
              <Link
                className={`menu-item ${
                  menu?.path === activatedMenu?.path ? 'menu-item-active' : ''
                }`}
                key={menu.id}
                to={menu.path}
              >
                {t(menu.title)}
              </Link>
            )}
          />
        ))}
      </div>
    </StyledMenuBar>
  );
};

export default memo(MenuBar);
