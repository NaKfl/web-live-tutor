import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledFooter } from './styles';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <div className="footer-wrapper">
        <div className="group-menus">
          <span>{t('Footer.policy')}</span>
          <span>{t('Footer.term')}</span>
          <span>{t('Footer.contact')}</span>
        </div>
        <div className="group-icons">
          <FontAwesomeIcon icon={faFacebookSquare} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
        </div>
        <div className="group-copyright">{t('Footer.copyright')}</div>
      </div>
    </StyledFooter>
  );
};

export default memo(Footer);
