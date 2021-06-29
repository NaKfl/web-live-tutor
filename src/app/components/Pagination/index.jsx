import { StyledPagination } from './style';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
export const Pagination = memo(prop => {
  //total
  //pageSize
  const location = useLocation();
  const { page } = qs.parse(location.search);
  return (
    <StyledPagination
      defaultCurrent={1}
      current={+page || prop.current || 1}
      showSizeChanger={false}
      {...prop}
    ></StyledPagination>
  );
});

export default Pagination;
