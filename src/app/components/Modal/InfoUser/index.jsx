import React, { memo } from 'react';
import {
  StyledModal,
  StyledProfile,
  StyledTutorTitle,
  StyledAvatar,
  StyledTutorContent,
  StyledGroupIconRight,
  StyledGroupIcon,
} from '../styles';
import Button from 'app/components/Button';
import TextHighlight from 'app/components/TextHighlight';
import TimeSelect from 'app/components/TimeSelect';
import Form from 'app/components/Form';
import {
  CloseOutlined,
  HeartOutlined,
  DashOutlined,
  MailOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import Image from 'app/components/Image';
import Rate from 'app/components/Rate';
import { Row, Col, Avatar, DatePicker, Calendar } from 'antd';
import moment from 'moment';
import { sliceKey, reducer } from './slice';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks from './hooks';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
const { Title } = Typography;

const TutorModal = memo(props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { t } = useTranslation();
  const { handlers, selectors } = useHooks(props);
  const { onSelectDate, handleBackSelectDate } = handlers;
  const { isSelectDate } = selectors;
  const { visible, onCancel, tutor, ...rest } = props;
  const {
    avatar,
    bio,
    country,
    languages,
    name,
    resume,
    specialties,
    video,
  } = tutor;

  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={[]}
      {...rest}
    >
      <StyledProfile>
        <Form
          className="profile-form"
          requiredMark={false}
          // initialValues={userInfo}
          layout="vertical"
        >
          <StyledTutorTitle {...rest}>
            <StyledGroupIcon>
              <CloseOutlined onClick={onCancel} />
              <StyledGroupIconRight>
                <HeartOutlined />
                <MailOutlined />
                <DashOutlined />
              </StyledGroupIconRight>
            </StyledGroupIcon>
            <Row className="tutor-info">
              <Col flex={0.1}>
                <StyledAvatar>
                  <Avatar
                    src={avatar}
                    shape="circle"
                    size={90}
                    className="avatar"
                  />
                </StyledAvatar>
              </Col>
              <Col className="group-info d-flex justify-content-center">
                <Title level={3}>{name}</Title>
                <Row className="country">
                  <Image
                    preview={false}
                    src={
                      'https://www.cambly.com/static/images/country-flag-icons/US.png'
                    }
                  />
                  <Title level={5} className="d-flex align-items-center">
                    {country}
                  </Title>
                </Row>
              </Col>
            </Row>
            <Row className="tutor-info d-flex">
              <Button type="accent">{t('Common.callNow')}</Button>
            </Row>
          </StyledTutorTitle>
          <StyledTutorContent {...rest}>
            <hr></hr>
            <Row className="mb-4 intro-video-section">
              <video
                className="video-tutor"
                src={video}
                controlsList="nodownload"
                controls
              ></video>
            </Row>
            <Row className="intro-badge">
              <Rate disabled defaultValue={5} className="rate mb-2" />
            </Row>
            <Row className="intro-section">
              <Title level={5}>{bio}</Title>
            </Row>
            <hr></hr>
            <Row className="intro-about flex-column">
              <Title level={4}>{t('Profile.about')}</Title>
              <Row>
                <Title level={5}>{t('Profile.languages')}</Title>
              </Row>
              <Row className="mb-1">
                {languages.map(content => (
                  <TextHighlight content={content} />
                ))}
              </Row>
              <Row>
                <Title level={5}>{t('Profile.specialties')}</Title>
              </Row>
              <Row className="mb-1">
                {specialties.map(content => (
                  <TextHighlight content={content} />
                ))}
              </Row>
              <Row>
                <Title level={5}>{t('Profile.interests')}</Title>
              </Row>
              <Row>
                <Title level={5}>
                  I have traveled a major part of the USA and parts of Eastern
                  Europe, Russia, the Philippines, and Chile. I now live in a
                  small town in South Carolina in the USA
                </Title>
              </Row>
            </Row>
            <hr></hr>
            <Row className="intro-about flex-column">
              <Title level={4}>{t('Profile.resume')}</Title>
              <Row>
                <Title level={5}>{t('Profile.teachExperience')}</Title>
              </Row>
              <Row>
                <Title level={5}>{resume}</Title>
              </Row>
            </Row>
            <hr></hr>
            <Row className="intro-schedule flex-column">
              <Title level={4}>{t('Profile.schedule')}</Title>
              <Row>
                {isSelectDate && (
                  <Title level={5}>{t('Common.selectTimeALot')}</Title>
                )}
                {!isSelectDate && (
                  <Title level={5}>{t('Common.selectDay')}</Title>
                )}
              </Row>
              <Row className="group-tutor-calender">
                {isSelectDate && (
                  <Row className="tutor-calender">
                    <Row
                      className="btn-back pointer align-items-center"
                      onClick={handleBackSelectDate}
                    >
                      <ArrowLeftOutlined /> <span>{t('Common.back')}</span>
                    </Row>
                    <Row className="flex-column w-100 p-4">
                      <DatePicker
                        className="w-50 mb-4"
                        defaultValue={moment(moment(), 'YYYY/MM/DD')}
                        format={'YYYY/MM/DD'}
                      />
                      <TimeSelect
                        time={'2:00 AM - 4:00 AM'}
                        disabled
                      ></TimeSelect>
                      <TimeSelect time={'2:00 AM - 4:00 AM'}></TimeSelect>
                      <TimeSelect time={'2:00 AM - 4:00 AM'}></TimeSelect>
                    </Row>
                  </Row>
                )}
                {!isSelectDate && (
                  <Row className="tutor-calender">
                    <Calendar onSelect={onSelectDate} />
                  </Row>
                )}
              </Row>
            </Row>
          </StyledTutorContent>
        </Form>
      </StyledProfile>
    </StyledModal>
  );
});

export default TutorModal;
