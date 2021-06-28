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
            Tổng quan
          </Title>
          <Title level={4} className="fw-nor">
            Tại sao chọn khóa học này?
          </Title>
          <Title level={5} className="fw-nor">
            {detailCourse?.reason}
          </Title>
          <Title level={4} className="fw-nor">
            Bạn sẽ học được gì từ khóa học?
          </Title>
          <Title level={5} className="fw-nor">
            {detailCourse?.purpose}
          </Title>
          <Title level={4} className="fw-nor">
            Trình độ yêu cầu
          </Title>
          <Title level={5} className="fw-nor">
            {detailCourse.level}
          </Title>
          <Title level={4} className="fw-nor">
            Độ dài khóa học
          </Title>
          <Title level={5} className="fw-nor">
            {`${detailCourse.topics?.length} chủ đề`}
          </Title>

          <Title level={4} className="fw-nor">
            Danh sách chủ đề
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
