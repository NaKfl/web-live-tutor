import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import {
  StyledHome,
  StyledPagination,
  StyledCoverSearch,
  StyledTopList,
  StyledFistPart,
  StyledTitle,
} from './styles';
import { useHooks } from './hooks';
import ListTutor from './ListTutor';
import Search from './Search';
import Banner from './Banner';
import TopTutor from './TopTutor';
import Pagination from 'app/components/Pagination';

export const Home = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { listTutor, listFavorite, pagination, topTutor } = selectors;
  const { onClickHeart, onSearch } = handlers;
  return (
    <StyledHome>
      <StyledFistPart>
        <Banner />
        <StyledTopList>
          <TopTutor data={topTutor} />
        </StyledTopList>
      </StyledFistPart>
      <StyledTitle>Find a Tutors</StyledTitle>
      {/* <StyledCoverSearch>
        <Search onSearch={onSearch}></Search>
      </StyledCoverSearch> */}
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
