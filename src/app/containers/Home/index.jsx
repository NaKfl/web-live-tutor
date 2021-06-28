import Divider from 'app/components/Divider';
import Pagination from 'app/components/Pagination';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ACTION_STATUS } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import Banner from './Banner';
import { useGetMajor, useHooks } from './hooks';
import ListTutor from './ListTutor';
import saga from './saga';
import Search from './Search';
import { reducer, sliceKey } from './slice';
import {
  StyledFistPart,
  StyledHome,
  StyledPagination,
  StyledSecondPart,
  StyledTitle,
} from './styles';
import TopTutor from './TopTutor';

export const Home = memo(() => {
  const { t } = useTranslation();
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  useGetMajor();
  const {
    listTutor,
    onlineTutors,
    listFavorite,
    pagination,
    topTutor,
    topTutorStatus,
    moreTutorsStatus,
  } = selectors;
  const { onClickHeart } = handlers;
  return (
    <StyledHome>
      <StyledFistPart>
        <Banner />
        <TopTutor
          className="top-tutor"
          data={topTutor}
          isLoading={topTutorStatus === ACTION_STATUS.PENDING}
        />
      </StyledFistPart>
      <StyledSecondPart>
        <div className="search-banner">
          <h3 className="search-title">{t('Tutors.searchTitle')}</h3>
          <p className="sub-title">
            {t('Tutors.connect')} <strong>{t('Tutors.totalStudents')}</strong>
            {t('Tutors.studentsTo')}
            <strong>{t('Tutors.totalTutors')}</strong>
            {t('Tutors.tutors')}
          </p>
          <Search placeholder={t('Tutors.searchPlaceholder')}></Search>
        </div>
      </StyledSecondPart>
      <Divider className="available-tutor-title">
        <StyledTitle>{t('Tutors.availableTutors')}</StyledTitle>
      </Divider>
      <ListTutor
        listTutor={onlineTutors}
        onClickHeart={onClickHeart}
        listFavorite={listFavorite}
        isListOnline={true}
      ></ListTutor>
      <Divider className="available-tutor-title">
        <StyledTitle>{t('Tutors.exploreTutor')}</StyledTitle>
      </Divider>
      <ListTutor
        listTutor={listTutor}
        onClickHeart={onClickHeart}
        listFavorite={listFavorite}
        isLoading={moreTutorsStatus === ACTION_STATUS.PENDING}
      ></ListTutor>
      <StyledPagination>
        <Pagination {...pagination}></Pagination>
      </StyledPagination>
    </StyledHome>
  );
});

export default Home;
