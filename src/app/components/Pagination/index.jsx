import { StyledPagination } from './style';
import { memo } from 'react';

export const Pagination = memo(prop => {
  //total
  //pageSize
  return (
    <StyledPagination
      defaultCurrent={1}
      current={prop.current || 1}
      showSizeChanger={false}
      {...prop}
    ></StyledPagination>
  );
});

export default Pagination;
