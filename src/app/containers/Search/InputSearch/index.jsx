import { memo, useEffect, useState, useCallback } from 'react';
import {
  WrapInputSearch,
  StyledInput,
  CoverInput,
  StyledClearButton,
} from '../style/InputSearchStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Filter from './Filter';
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';

export const InputSearch = memo(
  ({ placeholder, showHideDropDown, option, searchValue }) => {
    const [inputValue, setValue] = useState(searchValue || '');
    const history = useHistory();
    const [changeLocation, setLocation] = useState(false);
    const { t } = useTranslation();

    const ClearContent = useCallback(() => {
      setValue('');
      setLocation(true);
    }, []);

    useEffect(() => {
      if (searchValue) {
        setValue(searchValue);
      }
    }, [searchValue]);

    useEffect(() => {
      if (changeLocation) {
        onConfirmSearch();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeLocation, inputValue, ClearContent]);

    const onConfirmSearch = useCallback(
      searchKey => {
        return debounce(() => {
          history.push({
            pathname: '/search',
            search: qs.stringify({
              ...option,
              search: searchKey || inputValue,
            }),
          });
          setLocation(false);
        }, 100)();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [inputValue],
    );

    const onChangeValueSearch = useCallback(event => {
      setValue(event.target.value);
      setLocation(true);
    }, []);

    return (
      <WrapInputSearch>
        <CoverInput>
          <Filter showHideDropDown={showHideDropDown}></Filter>
          <StyledInput
            placeholder={placeholder || t('Search.search')}
            value={inputValue}
            onChange={onChangeValueSearch}
          ></StyledInput>
          {inputValue !== '' && (
            <StyledClearButton>
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => ClearContent()}
              ></FontAwesomeIcon>
            </StyledClearButton>
          )}
        </CoverInput>
      </WrapInputSearch>
    );
  },
);

export default InputSearch;
