import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUpdateOptionSearch } from 'app/containers/Search/hook';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CoverInput,
  StyledClearButton,
  StyledInput,
  WrapInputSearch,
} from '../style/InputSearchStyle';
import Filter from './Filter';

export const InputSearch = memo(
  ({ placeholder, showHideDropDown, option, searchValue }) => {
    const { updateOption } = useUpdateOptionSearch();
    const [inputValue, setValue] = useState(searchValue || '');
    const { t } = useTranslation();
    const isTyping = useRef(null);

    const clearContent = useCallback(() => {
      setValue('');
    }, []);

    useEffect(() => {
      if (searchValue) {
        setValue(searchValue);
      }
    }, [searchValue]);

    useEffect(() => {
      if (isTyping.current) clearTimeout(isTyping.current);
      isTyping.current = setTimeout(() => {
        updateOption({ ...option, search: inputValue });
      }, 500);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue]);

    const onChangeValueSearch = useCallback(event => {
      setValue(event.target.value);
    }, []);

    return (
      <WrapInputSearch>
        <CoverInput>
          <Filter showHideDropDown={showHideDropDown}></Filter>
          <StyledInput
            value={inputValue}
            placeholder={placeholder || t('Search.search')}
            onChange={onChangeValueSearch}
          ></StyledInput>
          {inputValue && (
            <StyledClearButton onClick={clearContent}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </StyledClearButton>
          )}
        </CoverInput>
      </WrapInputSearch>
    );
  },
);

export default InputSearch;
