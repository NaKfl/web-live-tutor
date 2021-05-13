import {
  ArrowLeftOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Calendar,
  Col,
  DatePicker,
  Row,
  Typography,
  Affix,
  Rate,
} from 'antd';
import Form from 'app/components/Form';
import Image from 'app/components/Image';
import TextHighlight from 'app/components/TextHighlight';
import TimeSelect from 'app/components/TimeSelect';
import moment from 'moment';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import {
  StyledAvatar,
  StyledProfile,
  StyledTutorContent,
  StyledTutorDetail,
  StyledTutorTitle,
  StyledTutorName,
} from './styles';
import Button from 'app/components/Button';
const { Title } = Typography;

export const TutorDetail = ({ ...rest }) => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { t } = useTranslation();

  const {
    onSelectDate,
    handleBackSelectDate,
    handleSelectDatePicker,
  } = handlers;

  const {
    tutorDetail,
    isSelectDate,
    scheduleDatesTutor,
    dateSelected,
    freeTimesTutor,
  } = selectors;

  const userInfo = tutorDetail.User ?? {};

  const { avatar, country, name } = userInfo;

  const { bio, languages, specialties, interests, video, resume } = tutorDetail;

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
    <StyledTutorDetail {...rest}>
      <Row justify="center">
        <Col span={14}>
          <StyledProfile>
            <Form
              className="profile-form"
              requiredMark={false}
              layout="vertical"
            >
              <Affix offsetTop={70}>
                <StyledTutorTitle {...rest}>
                  <Col>
                    <Row className="tutor-info">
                      <StyledAvatar>
                        <Avatar
                          src={avatar}
                          shape="circle"
                          size={90}
                          className="avatar"
                        />
                      </StyledAvatar>
                      <Row align="middle">
                        <Col className="group-info">
                          <StyledTutorName>{name}</StyledTutorName>
                          <Rate disabled defaultValue={5} className="rate" />
                          <Row className="country">
                            <Image
                              preview={false}
                              src={
                                'https://www.cambly.com/static/images/country-flag-icons/US.png'
                              }
                            />
                            <Title
                              level={5}
                              className="d-flex align-items-center"
                            >
                              {country}
                            </Title>
                          </Row>
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                  <Col>
                    <span className="status">{t('Profile.status')}</span>
                    <Button
                      icon={<VideoCameraOutlined />}
                      type="accent"
                      className="start-btn"
                    >
                      {t('Profile.callNow')}
                    </Button>
                  </Col>
                </StyledTutorTitle>
              </Affix>
              <StyledTutorContent {...rest}>
                <Row className="mb-4 intro-video-section">
                  <video
                    className="video-tutor"
                    // TODO: Change example video
                    // src={video}
                    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    controlsList="nodownload"
                    controls
                  />
                </Row>
                <div className="intro-section">
                  <StyledTutorName className="name">{name}</StyledTutorName>
                  <Title className="bio" level={5}>
                    {bio}
                  </Title>
                  <Button
                    type="accent"
                    className="schedule-btn"
                    icon={<CalendarOutlined style={{ fontWeight: 600 }} />}
                  >
                    {t('Profile.schedule')}
                  </Button>
                  <Row justify="space-around">
                    <div className="function-icon-group">
                      <MessageOutlined className="function-icon" />
                      <span> {t('Profile.message')}</span>
                    </div>
                    <div className="function-icon-group">
                      <HeartOutlined className="function-icon" />
                      <span> {t('Profile.favorite')}</span>
                    </div>
                    <div className="function-icon-group">
                      <BellOutlined className="function-icon" />
                      <span> {t('Profile.follow')}</span>
                    </div>
                    <div className="function-icon-group">
                      <ExclamationCircleOutlined className="function-icon" />
                      <span> {t('Profile.report')}</span>
                    </div>
                  </Row>
                </div>

                <Row className="intro-about flex-column">
                  <div className="part">
                    <Title level={5} className="part-title">
                      {t('Profile.about')}
                    </Title>
                    <Title className="part-content" level={5}>
                      {resume}
                    </Title>
                  </div>

                  <div className="part">
                    <Title level={5} className="part-title">
                      {t('Profile.languages')}
                    </Title>
                    <Row className="part-content">
                      {languages?.map(content => (
                        <TextHighlight content={content} key={content} />
                      ))}
                    </Row>
                  </div>
                  <div className="part">
                    <Title className="part-title" level={5}>
                      {t('Profile.specialties')}
                    </Title>
                    <Row className="part-content">
                      {specialties?.map(content => (
                        <TextHighlight content={content} key={content} />
                      ))}
                    </Row>
                  </div>
                  <div className="part">
                    <Title className="part-title" level={5}>
                      {t('Profile.interests')}
                    </Title>
                    <Title className="part-content" level={5}>
                      {interests}
                    </Title>
                  </div>
                  <div className="part last-part">
                    <Title className="part-title" level={5}>
                      {t('Profile.teachExperience')}
                    </Title>
                    <Title className="part-content" level={5}>
                      {resume}
                    </Title>
                  </div>
                </Row>

                <Row className="intro-schedule flex-column">
                  <Title className="schedule-title" level={5}>
                    {t('Profile.schedule')}
                  </Title>
                  <Row>
                    {isSelectDate && (
                      <Title className="schedule-content" level={5}>
                        {t('Common.selectTimeALot')}
                      </Title>
                    )}
                    {!isSelectDate && (
                      <Title className="schedule-content" level={5}>
                        {t('Common.selectDay')}
                      </Title>
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
                        <Row className="flex-column w-100 p-4 mt-4">
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
                              key={time.id}
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
            </Form>
          </StyledProfile>
        </Col>
      </Row>
    </StyledTutorDetail>
  );
};

export default memo(TutorDetail);
