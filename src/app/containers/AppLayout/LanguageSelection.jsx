import { StyledIcon } from './styles';
import US from 'assets/svg/united-states.svg';
import VN from 'assets/svg/vietnam.svg';
import Menu from 'app/components/Menu';
import Dropdown from 'app/components/Dropdown';
import { useTranslation } from 'react-i18next';

export const LanguageSelection = ({ ...props }) => {
  const { t, i18n } = useTranslation();
  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      overlay={
        <Menu>
          <Menu.Item
            className="d-flex align-items-center"
            onClick={() => i18n.changeLanguage('en')}
          >
            <StyledIcon className="me-2" src={US} alt="United States" />
            <span
              className={`${
                t('Common.default') === t('Common.en') ? 'fw-bol' : ''
              }`}
            >
              {t('Common.en')}
            </span>
          </Menu.Item>
          <Menu.Item
            className="d-flex align-items-center"
            onClick={() => i18n.changeLanguage('vn')}
          >
            <StyledIcon className="me-2" src={VN} alt="Vietnam" />
            <span
              className={`${
                t('Common.default') === t('Common.vn') ? 'fw-bol' : ''
              }`}
            >
              {t('Common.vn')}
            </span>
          </Menu.Item>
        </Menu>
      }
      {...props}
    >
      {t('Common.default') === t('Common.en') ? (
        <StyledIcon src={US} alt="United States" className="menu-icon" />
      ) : (
        <StyledIcon src={VN} alt="Vietnam" className="menu-icon" />
      )}
    </Dropdown>
  );
};

export default LanguageSelection;
