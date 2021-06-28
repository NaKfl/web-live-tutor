/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useState, useEffect } from 'react';
import { StyledCourseCard, StyledImageCard, StyledContentCard } from './styles';
import Title from 'app/components/Title';
import { Row } from 'antd';

export const CourseCard = memo(({ detailCourse, handleChangeTopic }) => {
  const [selectedTopic, setSelectedTopic] = useState(0);

  useEffect(() => {
    if (detailCourse?.topics) {
      const fileName = detailCourse?.topics[0].nameFile;
      handleChangeTopic(fileName);
    }
  }, [detailCourse]);

  return (
    <StyledCourseCard>
      <Row className="flex-column h-100">
        <StyledImageCard>
          <img
            width="100%"
            height="auto"
            alt="img"
            src={detailCourse?.imageUrl}
          />
        </StyledImageCard>
        <StyledContentCard className="flex-column w-100">
          <Title className="fw-nor title-course" level={3}>
            {detailCourse?.name}
          </Title>
          <Row className="flex-column justify-content-between ">
            <Title className="fw-nor m-0 description-course" level={5}>
              {detailCourse?.description}
            </Title>
            <Title className="fw-nor mt-2 description-course" level={4}>
              {`List Topics`}
            </Title>
          </Row>
          <Row className="flex-column">
            {detailCourse?.topics &&
              detailCourse?.topics.map((item, index) => (
                <Row
                  key={item.id}
                  className={`mt-2 topic-item ${
                    selectedTopic === index ? 'topic-highlight' : 'topic-normal'
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedTopic(index);
                    handleChangeTopic(item?.nameFile);
                  }}
                >
                  <Title
                    level={5}
                    className="fw-nor mt-0 me-3 topic-item-order"
                  >
                    {`${index + 1}.`}
                  </Title>
                  <Title level={5} className="fw-nor mt-0 topic-item-name">
                    {item?.name}
                  </Title>
                </Row>
              ))}
          </Row>
        </StyledContentCard>
      </Row>
    </StyledCourseCard>
  );
});
export default CourseCard;
