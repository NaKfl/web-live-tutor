import { memo, useState, useCallback } from 'react';
import { StyleSearch, StyleWrapperInput, StyleWrapperSearch } from './style';
import { SearchOutlined } from '@ant-design/icons';
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
        <div className="icon-search">
          <SearchOutlined />
        </div>
        <StyleSearch
          value={searchKey}
          onChange={e => setSearch(e.target.value)}
          placeholder={placeholder || 'Searching Tutor...'}
          onKeyDown={onEnterSearch}
        ></StyleSearch>
      </StyleWrapperInput>
    </StyleWrapperSearch>
  );
});

export default Search;
