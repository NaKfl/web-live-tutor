import { memo } from 'react';
import { CoverSearch, StyledIntro } from './style';
import InputSearch from './InputSearch';
import useHook, { useListTutorSearch, usePagination } from './hook';
import { reducer, sliceKey } from './slice';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import ListTutor from 'app/containers/Home/ListTutor';
import Pagination from 'app/components/Pagination';
import saga from './saga';
import { Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import Filter from './Filter';

export const Search = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const listTutor = useListTutorSearch();
  const { total, ...resPropsPagination } = usePagination();
  const { t } = useTranslation();
  const { selectors, handlers } = useHook();
  const { showHideDropDownState, option, searchValue } = selectors;
  const { onChangeFilter, showHideDropDown, onCheckedTag } = handlers;

  return (
    <CoverSearch>
      <InputSearch
        placeholder="Search..."
        option={option}
        onCheckedTag={onCheckedTag}
        showHideDropDown={showHideDropDown}
        searchValue={searchValue}
        onChangeFilter={onChangeFilter}
        showHideDropDownState={showHideDropDownState}
      ></InputSearch>
      <Filter />
      <StyledIntro>
        <div className="title">{t('Search.result')}</div>
      </StyledIntro>
      {total !== 0 ? (
        <ListTutor {...listTutor}></ListTutor>
      ) : (
        <Empty
          imageStyle={{
            height: 120,
          }}
          description={<span>{t('Search.sorry')}</span>}
        ></Empty>
      )}
      {total !== 0 && (
        <Pagination
          pageSize={15}
          total={total}
          current={1}
          {...resPropsPagination}
        ></Pagination>
      )}
    </CoverSearch>
  );
});

export default Search;
