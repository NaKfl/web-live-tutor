import {
  faFacebookSquare,
  faAppStoreIos,
  faAndroid,
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
          <FontAwesomeIcon
            icon={faFacebookSquare}
            onClick={() =>
              (window.location.href =
                'https://www.facebook.com/profile.php?id=100068595459354')
            }
          />
          <FontAwesomeIcon
            icon={faAndroid}
            onClick={() =>
              (window.location.href =
                'https://play.google.com/store/apps/details?id=com.livetutoring')
            }
          />
          <FontAwesomeIcon icon={faAppStoreIos} />
        </div>
        <div className="group-copyright">{t('Footer.copyright')}</div>
      </div>
    </StyledFooter>
  );
};

export default memo(Footer);
