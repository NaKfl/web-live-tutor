import { memo } from 'react';
import {
  StyledCourseCard,
  StyledImageCard,
  StyledLevelText,
  StyledContentCard,
} from './styles';
import Title from 'app/components/Title';
import { Row } from 'antd';

export const CourseCard = memo(({ course }) => {
  return (
    <StyledCourseCard>
      <Row className="flex-column">
        <StyledImageCard></StyledImageCard>
        <StyledContentCard class="flex-column w-100">
          <Title className="fw-nor" level={4}>
            {course.name}
          </Title>
          <Title className="fw-nor m-0" level={5}>
            {course.other_details}
          </Title>
          <StyledLevelText>
            {course.level.toUpperCase()}&nbsp;•&nbsp;{course.topicCount} TOPICS
          </StyledLevelText>
        </StyledContentCard>
      </Row>
    </StyledCourseCard>
  );
});
export default CourseCard;
