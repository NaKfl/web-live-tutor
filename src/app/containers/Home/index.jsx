import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import { StyledHome, StyledPagination, StyledCoverSearch } from './styles';
import { useHooks } from './hooks';
import ListTutor from './ListTutor';
import Search from './Search';
import Pagination from 'app/components/Pagination';

export const Home = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { listTutor, listFavorite, pagination } = selectors;
  const { onClickHeart, onSearch } = handlers;
  return (
    <StyledHome>
      <StyledCoverSearch>
        <Search onSearch={onSearch}></Search>
      </StyledCoverSearch>
      <ListTutor
        listTutor={listTutor}
        onClickHeart={onClickHeart}
        listFavorite={listFavorite}
      ></ListTutor>
      <StyledPagination>
        <Pagination {...pagination}></Pagination>
      </StyledPagination>
    </StyledHome>
  );
});

export default Home;
