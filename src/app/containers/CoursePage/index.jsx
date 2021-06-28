import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import CourseCard from './Course';
import { StyledCoursePage, LayoutListCourses } from './styles';
import useHooks from './hooks';
import Title from 'app/components/Title';
import { useTranslation } from 'react-i18next';

export const CoursePage = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { onSelectCard } = handlers;
  const { coursesList } = selectors;
  const { t } = useTranslation();
  return (
    <StyledCoursePage>
      <Title level={3} className="fw-nor">
        {t('Course.discoverCourse')}
      </Title>
      <Title level={3} className="fw-nor">
        {t('Course.basicCourse')}
      </Title>
      <Title level={5} className="fw-nor mt-3 mb-4 fz-18">
        {t('Course.descriptCourse')}
      </Title>
      <LayoutListCourses>
        {coursesList.map(course => (
          <CourseCard course={course} onSelectCard={onSelectCard} />
        ))}
      </LayoutListCourses>
    </StyledCoursePage>
  );
});

export default CoursePage;
