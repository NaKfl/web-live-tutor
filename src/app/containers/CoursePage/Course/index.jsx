import { memo } from 'react';
import {
  StyledCourseCard,
  StyledImageCard,
  StyledLevelText,
  StyledContentCard,
  StyledCard,
} from './styles';
import Title from 'app/components/Title';

export const CourseCard = memo(({ course, onSelectCard }) => {
  return (
    <StyledCourseCard onClick={() => onSelectCard(course.id)}>
      <StyledCard className="flex-column">
        <StyledImageCard>
          <img width="100%" height="193px" alt="img" src={course.imageUrl} />
        </StyledImageCard>
        <StyledContentCard className="flex-column w-100">
          <div>
            <Title className="fw-nor title-course" level={4}>
              {course?.name}
            </Title>
            <Title className="fw-nor m-0 description-course" level={5}>
              {course?.description}
            </Title>
          </div>
          <StyledLevelText>
            {course?.level?.toUpperCase()}&nbsp;•&nbsp;{course?.topics?.length}{' '}
            TOPICS
          </StyledLevelText>
        </StyledContentCard>
      </StyledCard>
    </StyledCourseCard>
  );
});
export default CourseCard;
