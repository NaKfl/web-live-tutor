import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import CourseCard from './Course';
import { Row, Col } from 'antd';
import { StyledDetailCourse } from './styles';
import useHooks from './hooks';
import Title from 'app/components/Title';

export const DetailCourse = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks();
  const { detailCourse } = selectors;
  return (
    <StyledDetailCourse>
      <Row>
        <Col className="detail-course-left p-3">
          {detailCourse.name && <CourseCard course={detailCourse} />}
        </Col>
        <Col className="detail-course-right p-3">
          <Title level={3} className="fw-nor">
            Overview
          </Title>
          <Title level={4} className="fw-nor">
            Why take this course?
          </Title>
          <Title level={5} className="fw-nor">
            It can be intimidating to speak with a foreigner, no matter how much
            grammar and vocabulary you've mastered. This course is specially
            designed to help you ease into English conversation.
          </Title>
          <Title level={4} className="fw-nor">
            What will you be able to do?
          </Title>
          <Title level={5} className="fw-nor">
            This course covers vocabulary at the CEFR A2 level. You will build
            confidence while learning to speak about a variety of common,
            everyday topics. In addition, you will build implicit grammar
            knowledge as your tutor models correct answers and corrects your
            mistakes.
          </Title>
          <Title level={4} className="fw-nor">
            Experience Level
          </Title>
          <Title level={5} className="fw-nor">
            {detailCourse.level}
          </Title>
          <Title level={4} className="fw-nor">
            Course Length
          </Title>
          <Title level={5} className="fw-nor">
            {`${detailCourse.topics?.length} topics`}
          </Title>

          <Title level={4} className="fw-nor">
            List Topics
          </Title>
          {detailCourse.topics?.map((topic, index) => (
            <Row className="mt-4 topic-item" key={index}>
              <Title level={5} className="fw-nor mt-0 me-3 topic-item-order">
                {`${index + 1}.`}
              </Title>
              <Title level={5} className="fw-nor mt-0 topic-item-name">
                {topic.name}
              </Title>
            </Row>
          ))}
        </Col>
      </Row>
    </StyledDetailCourse>
  );
});

export default DetailCourse;
