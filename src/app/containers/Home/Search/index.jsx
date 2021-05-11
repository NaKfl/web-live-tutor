import { memo, useState, useCallback } from 'react';
import { StyleSearch, StyleWrapperInput, StyleWrapperSearch } from './style';
import { SearchOutlined } from '@ant-design/icons';
import Button from 'app/components/Button';

export const Search = memo(({ placeholder, onSearch }) => {
  const [searchKey, setSearch] = useState('');

  const onEnterSearch = useCallback(
    event => {
      if (event.key === 'Enter') {
        onSearch(searchKey);
      }
    },
    [onSearch, searchKey],
  );

  return (
    <StyleWrapperSearch>
      <StyleWrapperInput>
        <StyleSearch
          value={searchKey}
          onChange={e => setSearch(e.target.value)}
          placeholder={placeholder || 'Searching...'}
          onKeyDown={onEnterSearch}
        />
        <Button
          className="icon-search"
          type="accent"
          onClick={() => onSearch(searchKey)}
        >
          <SearchOutlined />
        </Button>
      </StyleWrapperInput>
    </StyleWrapperSearch>
  );
});

export default Search;
