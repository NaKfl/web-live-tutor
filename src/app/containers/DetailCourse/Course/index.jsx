import { memo } from 'react';
import { StyledCourseCard, StyledImageCard, StyledContentCard } from './styles';
import Button from 'app/components/Button';
import Title from 'app/components/Title';
import { Row } from 'antd';

export const CourseCard = memo(({ course }) => {
  return (
    <StyledCourseCard>
      <Row className="flex-column h-100">
        <StyledImageCard>
          <img width="100%" height="auto" alt="img" src={course.imageUrl} />
        </StyledImageCard>
        <StyledContentCard className="flex-column w-100">
          <Title className="fw-nor title-course" level={2}>
            {course?.name}
          </Title>
          <Row className="flex-column justify-content-between ">
            <Title className="fw-nor m-0 description-course" level={5}>
              {course?.description}
            </Title>
            <Button
              className="w-100 mt-4 d-flex justify-content-center"
              type="accent"
              size="large"
            >
              ENROLL
            </Button>
          </Row>
        </StyledContentCard>
      </Row>
    </StyledCourseCard>
  );
});
export default CourseCard;
