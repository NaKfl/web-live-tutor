import { memo } from 'react';
import { CoverSearch, StyledIntro } from './style';
import InputSearch from './InputSearch';
import useHook, { useListTutorSearch, usePagination } from './hook';
import { reducer, sliceKey } from './slice';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import ListTutor from 'app/containers/Home/ListTutor';
import Pagination from 'app/components/Pagination';
import saga from './saga';
import { Divider, Empty, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import Filter from './Filter';
import Banner from 'app/containers/Home/Banner';

export const Search = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const listTutor = useListTutorSearch();
  const { total, ...resPropsPagination } = usePagination();
  const { t } = useTranslation();
  const { selectors, handlers } = useHook();
  const { showHideDropDownState, option, searchValue, loading } = selectors;
  const { onChangeFilter, showHideDropDown, onCheckedTag } = handlers;
  return (
    <CoverSearch>
      <Banner />
      <InputSearch
        placeholder={t('Tutors.searchPlaceholder')}
        option={option}
        onCheckedTag={onCheckedTag}
        showHideDropDown={showHideDropDown}
        searchValue={searchValue}
        onChangeFilter={onChangeFilter}
        showHideDropDownState={showHideDropDownState}
      />
      <Filter />
      <Divider className="available-tutor-title">
        <StyledIntro>{t('Search.result')}</StyledIntro>
      </Divider>
      <Spin spinning={loading} size="large">
        {total === 0 && loading === false && (
          <Empty
            imageStyle={{
              height: 120,
            }}
            description={<span>{t('Search.sorry')}</span>}
          ></Empty>
        )}
        {total !== 0 && <ListTutor {...listTutor}></ListTutor>}
        {total !== 0 && (
          <Pagination
            pageSize={15}
            total={total}
            current={1}
            {...resPropsPagination}
          ></Pagination>
        )}
      </Spin>
    </CoverSearch>
  );
});

export default Search;
