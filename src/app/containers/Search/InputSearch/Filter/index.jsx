import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { CoverFilter, Filter as StyledFilter } from './style';
import { Badge } from 'antd';
import { useTranslation } from 'react-i18next';

export const Filter = memo(({ showHideDropDown }) => {
  const { t } = useTranslation();
  return (
    <Badge>
      <CoverFilter>
        <StyledFilter onClick={showHideDropDown}>
          <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
          <p>{t('Search.filter')}</p>
        </StyledFilter>
      </CoverFilter>
    </Badge>
  );
});

export default Filter;
