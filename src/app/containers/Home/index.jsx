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
  const { selectors } = useHooks();
  const { listTutor } = selectors;
  return (
    <StyledHome>
      <ListTutor listTutor={listTutor}></ListTutor>
    </StyledHome>
  );
});

export default Home;
