import { StyledPagination } from './style';
import { memo } from 'react';

export const Pagination = memo(prop => {
  return (
    <StyledPagination
      defaultCurrent={1}
      current={1}
      {...prop}
    ></StyledPagination>
  );
});

export default Pagination;
