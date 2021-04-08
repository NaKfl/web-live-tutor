import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import CourseCard from './Course';
import { Row, Col } from 'antd';
import { StyledCoursePage } from './styles';
import useHooks from './hooks';
import Title from 'app/components/Title';

export const CoursePage = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { onSelectCard } = handlers;
  const { coursesList } = selectors;
  return (
    <StyledCoursePage>
      <Title level={3} className="fw-nor">
        Discover Courses
      </Title>
      <Title level={3} className="fw-nor">
        Fundamentals of English Fluency
      </Title>
      <Title level={5} className="fw-nor mt-3 mb-4 fz-18">
        Gain confidence and fluency in conversational English. There is
        something for everyone, with courses for all skill levels covering
        everything from the basics of smalltalk to crafting well-formed opinions
        about complex, topical issues. Business communication in an
        international setting requires more than just strong English language
        skills. Effective cross-cultural communication, both verbal and
        non-verbal, is a powerful tool for career growth.
      </Title>
      <Row gutter={[30, 30]}>
        {coursesList.map(course => (
          <Col key={course.id} className="gutter-row" span={6}>
            <CourseCard course={course} onSelectCard={onSelectCard} />
          </Col>
        ))}
      </Row>
    </StyledCoursePage>
  );
});

export default CoursePage;
