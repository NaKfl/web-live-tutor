import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import CourseCard from './Course';
import { Row, Col, Divider, Spin } from 'antd';
import { StyledDetailCourse } from './styles';
import useHooks from './hooks';
import { useTranslation } from 'react-i18next';
import {
  BookOutlined,
  QuestionCircleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

export const DetailCourse = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { tutorAddCourse, tutorRemoveCourse } = handlers;
  const { detailCourse, loading, user, tutorActionLoading } = selectors;
  const { t } = useTranslation();

  return (
    <Row justify="center">
      <Spin spinning={loading}>
        <Col lg={20} md={22} sm={24}>
          <StyledDetailCourse justify="center">
            <Col lg={9} md={11} sm={24} className="detail-course-left p-3">
              {detailCourse && (
                <CourseCard
                  user={user}
                  course={detailCourse}
                  tutorAddCourse={tutorAddCourse}
                  tutorRemoveCourse={tutorRemoveCourse}
                  tutorActionLoading={tutorActionLoading}
                />
              )}
            </Col>
            <Col lg={15} md={13} sm={24} className="detail-course-right p-3">
              <Divider orientation="left">
                <span className="title">{t('Course.overview')}</span>
              </Divider>
              <Row align="middle">
                <QuestionCircleOutlined className="sub-title-icon question" />
                <h3 className="sub-title">{t('Course.whyTake')}</h3>
              </Row>
              <p className="content">{detailCourse?.reason}</p>
              <Row align="middle">
                <QuestionCircleOutlined className="sub-title-icon question" />
                <h3 className="sub-title"> {t('Course.willToDo')}</h3>
              </Row>
              <p className="content">{detailCourse?.purpose}</p>

              <Divider orientation="left">
                <span className="title">{t('Course.level')}</span>
              </Divider>
              <Row align="middle">
                <UsergroupAddOutlined className="sub-title-icon people" />
                <h3 className="sub-title"> {detailCourse.level}</h3>
              </Row>

              <Divider orientation="left">
                <span className="title">{t('Course.courseLength')}</span>
              </Divider>
              <Row align="middle">
                <BookOutlined className="sub-title-icon people" />
                <h3 className="sub-title">
                  {`${detailCourse.topics?.length} ${t('Course.topic')} `}
                </h3>
              </Row>

              <Divider orientation="left">
                <span className="title">{t('Course.listTopics')}</span>
              </Divider>
              {detailCourse.topics?.map((topic, index) => (
                <Row className="topic-item" key={index}>
                  <h3 className="sub-title topic">{`${index + 1}.`}</h3>
                  <h3 className="sub-title topic">{topic.name}</h3>
                </Row>
              ))}
            </Col>
          </StyledDetailCourse>
        </Col>
      </Spin>
    </Row>
  );
});

export default DetailCourse;
