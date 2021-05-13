import { memo } from 'react';
import {
  StyledCourseCard,
  StyledImageCard,
  StyledLevelText,
  StyledContentCard,
} from './styles';
import Title from 'app/components/Title';
import { Row } from 'antd';

export const CourseCard = memo(({ course, onSelectCard }) => {
  return (
    <StyledCourseCard onClick={() => onSelectCard(course.id)}>
      <Row className="flex-column">
        <StyledImageCard
          style={{
            backgroundImage: `url('${course?.imageUrl}')`,
          }}
        ></StyledImageCard>
        <StyledContentCard className="flex-column w-100">
          <Title className="fw-nor title-course" level={4}>
            {course?.name}
          </Title>
          <Title className="fw-nor m-0 description-course" level={5}>
            {course?.other_details}
          </Title>
          <StyledLevelText>
            {course?.level?.toUpperCase()}&nbsp;•&nbsp;{course?.topics?.length}{' '}
            TOPICS
          </StyledLevelText>
        </StyledContentCard>
      </Row>
    </StyledCourseCard>
  );
});
export default CourseCard;
