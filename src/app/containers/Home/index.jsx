import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import { StyledHome } from './styles';
import { useHooks } from './hooks';
import ListTutor from './ListTutor';

export const Home = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { listTutor, listFavorite } = selectors;
  const { onClickHeart } = handlers;
  return (
    <StyledHome>
      <ListTutor
        listTutor={listTutor}
        onClickHeart={onClickHeart}
        listFavorite={listFavorite}
      ></ListTutor>
    </StyledHome>
  );
});

export default Home;
