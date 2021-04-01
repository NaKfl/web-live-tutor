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
import Conversation from 'app/containers/Chat/Conversation';
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
import { sliceKey, reducer } from 'app/containers/ScheduleTutor/slice';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from 'app/containers/ScheduleTutor/saga';
import useHooks from './hooks';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
const { Title } = Typography;

const TutorModal = memo(props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { t } = useTranslation();
  const { handlers, selectors } = useHooks(props);
  const {
    onSelectDate,
    handleBackSelectDate,
    toggleMessage,
    handleSelectDatePicker,
  } = handlers;
  const {
    isSelectDate,
    isShowMessage,
    scheduleDatesTutor,
    dateSelected,
    user,
    freeTimesTutor,
  } = selectors;
  const { visible, onCancel, tutor, ...rest } = props;
  const {
    avatar,
    bio,
    country,
    languages,
    name,
    resume,
    specialties,
    interests,
    video,
  } = tutor;

  const style = {
    color: 'green',
    fontWeight: 'bold',
    textDecoration: 'underline',
    background: 'none',
  };

  const disabledDate = value => {
    const dateOfCell = moment(value).format('YYYY-MM-DD');
    return !Object.keys(scheduleDatesTutor).includes(dateOfCell);
  };
  const datePickerRender = value => {
    const dateOfCell = moment(value).format('YYYY-MM-DD');
    const haveFreeTimes = Object.keys(scheduleDatesTutor).includes(dateOfCell);
    return (
      <div
        className="ant-picker-cell-inner"
        style={haveFreeTimes ? style : {}}
        onClick={() => handleSelectDatePicker(dateOfCell)}
      >
        {value.date()}
      </div>
    );
  };
  const dateCellRender = value => {
    const dateOfCell = moment(value).format('YYYY-MM-DD');
    const dayOfDate = value.date();
    const haveFreeTimes = Object.keys(scheduleDatesTutor).includes(dateOfCell);
    return (
      <div className="ant-picker-cell-inner ant-picker-calendar-date background-free-time">
        <div
          onClick={() => haveFreeTimes && onSelectDate(dateOfCell)}
          className={`ant-picker-calendar-date-value ${
            haveFreeTimes ? 'date-free-time' : 'date-disabled'
          }`}
        >
          {dayOfDate}
        </div>
        <div className="ant-picker-calendar-date-content"></div>
      </div>
    );
  };

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
        <Form className="profile-form" requiredMark={false} layout="vertical">
          <StyledTutorTitle {...rest}>
            <StyledGroupIcon>
              <CloseOutlined onClick={onCancel} />
              <StyledGroupIconRight>
                <HeartOutlined />
                <MailOutlined onClick={toggleMessage} />
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
          {(isShowMessage && (
            <StyledTutorContent {...rest}>
              <hr></hr>
              <Conversation
                fromId={user?.id}
                toId={tutor?.userId}
                height={400}
              />
            </StyledTutorContent>
          )) || (
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
                <Title level={5}>{t('Profile.languages')}</Title>
                <Row className="mb-1">
                  {languages.map(content => (
                    <TextHighlight content={content} />
                  ))}
                </Row>
                <Title level={5}>{t('Profile.specialties')}</Title>
                <Row className="mb-1">
                  {specialties.map(content => (
                    <TextHighlight content={content} />
                  ))}
                </Row>
                <Title level={5}>{t('Profile.interests')}</Title>
                <Title level={5}>{interests}</Title>
              </Row>
              <hr></hr>
              <Row className="intro-about flex-column">
                <Title level={4}>{t('Profile.resume')}</Title>
                <Title level={5}>{t('Profile.teachExperience')}</Title>
                <Title level={5}>{resume}</Title>
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
                          mode="date"
                          className="w-50 mb-4"
                          disabledDate={disabledDate}
                          dateRender={datePickerRender}
                          value={moment(dateSelected, 'YYYY-MM-DD')}
                          format={'YYYY-MM-DD'}
                        />
                        {(freeTimesTutor || []).map(time => (
                          <TimeSelect
                            time={`From  ${time.startTime}  to  ${time.endTime}`}
                            scheduleId={time.id}
                          ></TimeSelect>
                        ))}
                      </Row>
                    </Row>
                  )}
                  {!isSelectDate && (
                    <Row className="tutor-calender">
                      <Calendar
                        dateFullCellRender={dateCellRender}
                        mode="month"
                      />
                    </Row>
                  )}
                </Row>
              </Row>
            </StyledTutorContent>
          )}
        </Form>
      </StyledProfile>
    </StyledModal>
  );
});

export default TutorModal;
