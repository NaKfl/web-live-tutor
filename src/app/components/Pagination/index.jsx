import { StyledPagination } from './style';
import { memo } from 'react';

export const Pagination = memo(prop => {
  return <StyledPagination {...prop}></StyledPagination>;
});

export default Pagination;
