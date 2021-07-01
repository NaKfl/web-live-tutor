import { memo } from 'react';
import CallSessionTable from './CallSessionTable';
import { StyledHistory } from './style';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import sagaHome from 'app/containers/Home/saga';
import { sliceKey as sliceKeyHome } from 'app/containers/Home/slice';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { useHook } from './hook';

export const History = memo(() => {
  useInjectSaga({ key: sliceKeyHome, saga: sagaHome });
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handles } = useHook();
  const { totalCount, allFeedbacks } = selectors;
  const { changeCategory, onChangePage, handleShowReviews } = handles;
  return (
    <StyledHistory>
      <CallSessionTable
        changeCategory={changeCategory}
        onChangePage={onChangePage}
        handleShowReviews={() => {
          handleShowReviews({
            feedbacks: allFeedbacks,
          });
        }}
        totalCount={totalCount}
      ></CallSessionTable>
    </StyledHistory>
  );
});

export default History;
