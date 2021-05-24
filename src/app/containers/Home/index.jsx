import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import {
  StyledHome,
  StyledTopList,
  StyledFistPart,
  StyledTitle,
  StyledSecondPart,
  StyledPagination,
} from './styles';
import { useHooks } from './hooks';
import ListTutor from './ListTutor';
import Search from './Search';
import Banner from './Banner';
import TopTutor from './TopTutor';
import { useTranslation } from 'react-i18next';
import Pagination from 'app/components/Pagination';
import { ACTION_STATUS } from 'utils/constants';

export const Home = memo(() => {
  const { t } = useTranslation();
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
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
        <StyledTopList>
          <TopTutor
            data={topTutor}
            isLoading={topTutorStatus === ACTION_STATUS.PENDING}
          />
        </StyledTopList>
      </StyledFistPart>
      <StyledSecondPart>
        <div className="search-banner">
          <h3 className="search-title">{t('Tutors.searchTitle')}</h3>
          <p className="sub-title">
            {t('Tutors.connect')} <strong>{t('Tutors.totalStudents')}</strong>{' '}
            {t('Tutors.studentsTo')}
            <strong>{t('Tutors.totalTutors')}</strong>
            {t('Tutors.tutors')}
          </p>
          <Search placeholder={t('Tutors.searchPlaceholder')}></Search>
        </div>
      </StyledSecondPart>
      <StyledTitle className="available-tutor-title">
        {t('Tutors.availableTutors')}
      </StyledTitle>
      <ListTutor
        listTutor={onlineTutors}
        onClickHeart={onClickHeart}
        listFavorite={listFavorite}
      ></ListTutor>
      <StyledTitle className="available-tutor-title">
        {t('Tutors.exploreTutor')}
      </StyledTitle>
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
