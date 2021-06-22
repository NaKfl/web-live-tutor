import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledMoreMenus, StyledSection, StyledMenuItem } from './styles';
import { useGetUserInfo } from 'app/containers/AppLayout/hooks';
import Avatar from 'app/components/Avatar';
import {
  faWallet,
  faExchangeAlt,
  faUserGraduate,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuBarListItems } from 'app/containers/Menu/constants';
import Can from 'app/containers/AppLayout/Can';
import { useHistory } from 'react-router-dom';
import { useChangeRole } from 'app/containers/AppLayout/hooks';
import { ROLES } from 'utils/constants';
import { useLogout } from 'app/containers/Login/hooks';

export const MoreMenus = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useGetUserInfo();
  const { changeRole } = useChangeRole();
  const { handlers } = useLogout();
  const { onLogout } = handlers;

  return (
    <StyledMoreMenus>
      <StyledSection>
        <StyledMenuItem onClick={() => history.push('/profile')}>
          <Avatar className="icon" size={38} src={user?.avatar} />
          <span className="text">{user?.name}</span>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => history.push('/my-wallet')}>
          <FontAwesomeIcon className="icon small" icon={faWallet} />
          <span className="text">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(user?.walletInfo?.amount)}
          </span>
        </StyledMenuItem>
        {MenuBarListItems.map(menu => (
          <Can
            key={menu.id}
            requiredRoles={menu.requiredRoles}
            yes={() => (
              <StyledMenuItem onClick={() => history.push(menu.path)}>
                {menu.icon && <menu.icon className="icon small" />}
                <span className="text">{t(menu.title)}</span>
              </StyledMenuItem>
            )}
          />
        ))}
        {(!user?.roles?.includes(ROLES.TUTOR) && (
          <StyledMenuItem onClick={() => history.push('/register-tutor')}>
            <FontAwesomeIcon className="icon small" icon={faUserGraduate} />
            <span className="text">{t('Header.linkRegisterTutor')}</span>
          </StyledMenuItem>
        )) || (
          <StyledMenuItem onClick={() => changeRole()}>
            <FontAwesomeIcon className="icon small" icon={faExchangeAlt} />
            <span className="text">
              {user?.currentRole === ROLES.STUDENT
                ? t('Header.switchRoleToTutor')
                : t('Header.switchRoleToStudent')}
            </span>
          </StyledMenuItem>
        )}
        <StyledMenuItem onClick={onLogout}>
          <FontAwesomeIcon className="icon small" icon={faSignOutAlt} />
          <span className="text">{t('Header.linkLogout')}</span>
        </StyledMenuItem>
      </StyledSection>
    </StyledMoreMenus>
  );
};

export default memo(MoreMenus);
