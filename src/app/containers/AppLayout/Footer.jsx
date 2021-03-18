import React, { memo } from 'react';
import { StyledFooter, StyledText, ButtonNoOutline } from './styles';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu } from 'antd';

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const menu = (
    <Menu>
      <Menu.Item onClick={() => i18n.changeLanguage('en')}>
        {t('Common.en')}
      </Menu.Item>
      <Menu.Item onClick={() => i18n.changeLanguage('vn')}>
        {t('Common.vn')}
      </Menu.Item>
    </Menu>
  );
  return (
    <StyledFooter>
      <StyledText>{t('Common.brand')}</StyledText>
      <Dropdown placement="topCenter" overlay={menu} trigger="click">
        <ButtonNoOutline>{t('Common.default')}</ButtonNoOutline>
      </Dropdown>
    </StyledFooter>
  );
};

export default memo(Footer);
