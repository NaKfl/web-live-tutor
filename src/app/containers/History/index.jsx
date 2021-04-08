import { memo } from 'react';
import CallSessionTable from './CallSessionTable';
import { StyledHistory } from './style';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { useHook } from './hook';

export const History = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handles } = useHook();
  const { totalCount } = selectors;
  const { changeCategory, onChangePage } = handles;
  return (
    <StyledHistory>
      <CallSessionTable
        changeCategory={changeCategory}
        onChangePage={onChangePage}
        totalCount={totalCount}
      ></CallSessionTable>
    </StyledHistory>
  );
});

export default History;
