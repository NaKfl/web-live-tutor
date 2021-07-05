import { memo } from 'react';
import { StyledCourseCard, StyledImageCard, StyledContentCard } from './styles';
import Button from 'app/components/Button';
import Title from 'app/components/Title';
import { useHistory } from 'react-router';
import { Row, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { ROLES } from 'utils/constants';

export const CourseCard = memo(
  ({ course, tutorAddCourse, tutorRemoveCourse, tutorActionLoading }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const user = getUserFromStorage();
    return (
      <StyledCourseCard>
        <Row className="flex-column h-100">
          <StyledImageCard>
            <img width="100%" height="auto" alt="img" src={course.imageUrl} />
          </StyledImageCard>
          <StyledContentCard className="flex-column w-100">
            <Title className="title-course" level={2}>
              {course?.name}
            </Title>
            <Row className="flex-column justify-content-between ">
              <Title className="m-0 description-course" level={5}>
                {course?.description}
              </Title>
              <Button
                className="w-100 mt-4 d-flex justify-content-center explore-btn"
                type="accent"
                size="large"
                onClick={() => {
                  history.push(`/explore-course/${course.id}`);
                }}
              >
                {t('Course.discover')}
              </Button>
              {user?.currentRole === ROLES.TUTOR &&
                !user?.courses?.find(item => item?.id === course.id) && (
                  <Button
                    className="w-100 mt-2 d-flex justify-content-center explore-btn"
                    type="primary"
                    size="large"
                    onClick={() => tutorAddCourse(course.id)}
                  >
                    {t('Course.tutorAdd')}
                  </Button>
                )}
              {user?.currentRole === ROLES.TUTOR &&
                user?.courses?.find(item => item?.id === course.id) && (
                  <Button
                    className="w-100 mt-2 d-flex justify-content-center explore-btn"
                    size="large"
                    onClick={() => tutorRemoveCourse(course.id)}
                  >
                    {t('Course.tutorRemove')}
                  </Button>
                )}
            </Row>
          </StyledContentCard>
        </Row>
      </StyledCourseCard>
    );
  },
);
export default CourseCard;
