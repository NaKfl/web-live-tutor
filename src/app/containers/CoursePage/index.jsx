import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import CourseCard from './Course';
import { StyledCoursePage, LayoutListCourses, StyledHeader } from './styles';
import useHooks from './hooks';
import { useTranslation } from 'react-i18next';
import courseIcon from 'assets/svg/course.svg';

export const CoursePage = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { onSelectCard } = handlers;
  const { coursesList } = selectors;
  const { t } = useTranslation();
  return (
    <StyledCoursePage>
      <StyledHeader>
        <img className="image" src={courseIcon} alt="calendar" />
        <div className="content">
          <h2>{t('Course.discoverCourse')}</h2>
          <p>{t('Course.basicCourse')}</p>
          <p>{t('Course.descriptCourse')}</p>
        </div>
      </StyledHeader>
      <LayoutListCourses>
        {coursesList.map(course => (
          <CourseCard course={course} onSelectCard={onSelectCard} />
        ))}
      </LayoutListCourses>
    </StyledCoursePage>
  );
});

export default CoursePage;
