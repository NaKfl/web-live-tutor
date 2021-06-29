/* eslint-disable react-hooks/exhaustive-deps */
import { Row } from 'antd';
import Title from 'app/components/Title';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledContentCard, StyledCourseCard, StyledImageCard } from './styles';

export const CourseCard = memo(
  ({ detailCourse, handleChangeTopic, ...props }) => {
    const [selectedTopic, setSelectedTopic] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
      if (detailCourse?.topics) {
        const fileName = detailCourse?.topics[0].nameFile;
        handleChangeTopic(fileName);
      }
    }, [detailCourse]);

    return (
      <StyledCourseCard {...props}>
        <StyledImageCard>
          <img
            width="100%"
            height="auto"
            alt="img"
            src={detailCourse?.imageUrl}
          />
        </StyledImageCard>
        <StyledContentCard className="flex-column w-100">
          <Title className=" title-course" level={3}>
            {detailCourse?.name}
          </Title>
          <Row className="flex-column justify-content-between ">
            <Title className="description-course" level={5}>
              {detailCourse?.description}
            </Title>
            <Title className="title-course" level={4}>
              {t('Course.listTopics')}
            </Title>
          </Row>
          <Row className="flex-column">
            {detailCourse?.topics &&
              detailCourse?.topics.map((item, index) => (
                <Row
                  key={item.id}
                  className={`mt-1 topic ${
                    selectedTopic === index ? 'topic-highlight' : 'topic-normal'
                  }`}
                  onClick={() => {
                    setSelectedTopic(index);
                    handleChangeTopic(item?.nameFile);
                  }}
                >
                  <h3 className="topic-item-name">{`${index + 1}.`}</h3>
                  <h3 className="topic-item-content">{item?.name}</h3>
                </Row>
              ))}
          </Row>
        </StyledContentCard>
      </StyledCourseCard>
    );
  },
);
export default CourseCard;
