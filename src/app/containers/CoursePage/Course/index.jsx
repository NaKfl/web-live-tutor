import { memo } from 'react';
import {
  StyledCourseCard,
  StyledImageCard,
  StyledLevelText,
  StyledContentCard,
  StyledCard,
} from './styles';

export const CourseCard = memo(({ course, onSelectCard }) => {
  return (
    <StyledCourseCard onClick={() => onSelectCard(course.id)}>
      <StyledCard className="flex-column">
        <StyledImageCard>
          <img width="100%" height="193px" alt="img" src={course.imageUrl} />
        </StyledImageCard>
        <StyledContentCard className="flex-column w-100">
          <div>
            <h3 className="title-course" level={4}>
              {course?.name}
            </h3>
            <h3 className="description-course" level={5}>
              {course?.description}
            </h3>
          </div>
          <StyledLevelText>
            {course?.level?.toUpperCase()}&nbsp;•&nbsp;{course?.topics?.length}
            &nbsp;CHỦ ĐỀ
          </StyledLevelText>
        </StyledContentCard>
      </StyledCard>
    </StyledCourseCard>
  );
});
export default CourseCard;
