import {
  ArrowLeftOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
  HeartOutlined,
  CheckOutlined,
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
  Collapse,
  Skeleton,
} from 'antd';
import Form from 'app/components/Form';
import Image from 'app/components/Image';
import TextHighlight from 'app/components/TextHighlight';
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
import GroupSelectTime from 'app/components/GroupSelectTime';
import { MAJOR_NAMES } from '../RegisterTutor/StepProfile/constants';
import COUNTRIES from 'utils/countries';
import { ACTION_STATUS } from 'utils/constants';
import { ModalBookConfirm } from './ModalBookConfirm';
const { Title } = Typography;
const { Panel } = Collapse;

export const TutorDetail = ({ ...rest }) => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { t } = useTranslation();

  const {
    onSelectDate,
    handleBackSelectDate,
    handleSelectDatePicker,
    handleDisableBtnBook,
    handleBookSchedule,
  } = handlers;

  const {
    tutorDetail,
    isSelectDate,
    scheduleDatesTutor,
    dateSelected,
    freeTimesTutor,
    isShowedBtnBook,
    form,
    getTutorDetailStatus,
    scheduleTutorByDateStatus,
    scheduleTutorIdStatus,
  } = selectors;

  const userInfo = tutorDetail.User ?? {};

  const { avatar, country, name } = userInfo;

  const {
    bio,
    languages,
    specialties,
    interests,
    video,
    avgRating,
    experience,
  } = tutorDetail;
  const rating = Math.floor(avgRating * 2) / 2.0;
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
    const compareToDateNow = moment(value).diff(moment(), 'days');

    if (compareToDateNow < 0) {
      return (
        <div className="ant-picker-cell-inner ant-picker-calendar-date background-free-time">
          <div className={`ant-picker-calendar-date-value date-disabled `}>
            {dayOfDate}
          </div>
          <div className="ant-picker-calendar-date-content"></div>
        </div>
      );
    } else {
      return (
        <div
          onClick={() => haveFreeTimes && onSelectDate(dateOfCell)}
          className="ant-picker-cell-inner ant-picker-calendar-date background-free-time"
        >
          <div
            className={`ant-picker-calendar-date-value ${
              haveFreeTimes ? 'date-free-time' : 'date-disabled'
            }`}
          >
            {dayOfDate}
          </div>
          <div className="ant-picker-calendar-date-content"></div>
        </div>
      );
    }
  };

  return (
    <StyledTutorDetail {...rest}>
      <Row justify="center">
        <Col span={14}>
          <StyledProfile>
            <Row className="profile-form">
              <Affix offsetTop={70} className="w-100">
                <StyledTutorTitle {...rest}>
                  {(getTutorDetailStatus === ACTION_STATUS.PENDING && (
                    <Skeleton avatar active paragraph={{ rows: 2 }} />
                  )) || (
                    <>
                      <Col>
                        <Row className="tutor-info">
                          <StyledAvatar>
                            <Avatar
                              src={avatar}
                              shape="circle"
                              size={100}
                              className="avatar"
                            />
                          </StyledAvatar>
                          <Row align="middle">
                            <Col className="group-info">
                              <StyledTutorName>{name}</StyledTutorName>
                              {(rating && (
                                <Rate
                                  disabled
                                  value={rating}
                                  className="rate"
                                />
                              )) || (
                                <span
                                  style={{
                                    fontStyle: 'italic',
                                    color: 'rgb(0 0 0 / 0.6)',
                                  }}
                                >
                                  {t('Tutors.noFeedback')}
                                </span>
                              )}
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
                                  {COUNTRIES[country]}
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
                    </>
                  )}
                </StyledTutorTitle>
              </Affix>
              <StyledTutorContent {...rest}>
                {(getTutorDetailStatus === ACTION_STATUS.PENDING &&
                  [...Array(5)].map((_, index) => (
                    <Skeleton key={index} active paragraph={{ rows: 2 }} />
                  ))) || (
                  <>
                    <Row className="mb-4 intro-video-section">
                      <video
                        className="video-tutor"
                        // TODO: Change example video
                        src={
                          video ??
                          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                        }
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
                          {bio}
                        </Title>
                      </div>

                      <div className="part">
                        <Title level={5} className="part-title">
                          {t('Profile.languages')}
                        </Title>
                        <Row className="part-content">
                          {languages?.[0]?.split(',')?.map(content => (
                            <TextHighlight content={content} key={content} />
                          ))}
                        </Row>
                      </div>
                      <div className="part">
                        <Title className="part-title" level={5}>
                          {t('Profile.specialties')}
                        </Title>
                        <Row className="part-content">
                          {specialties?.[0]?.split(',')?.map(key => (
                            <TextHighlight
                              content={
                                t('Common.default') === t('Common.vn')
                                  ? MAJOR_NAMES[key]?.vietnameseName
                                  : MAJOR_NAMES[key]?.englishName
                              }
                              key={key}
                            />
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
                          {experience}
                        </Title>
                      </div>
                    </Row>

                    <Row className="intro-schedule flex-column">
                      <Title className="schedule-title" level={5}>
                        {t('Profile.schedule')}
                      </Title>
                      <Row>
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
                              <ArrowLeftOutlined />
                              <span>{t('Common.back')}</span>
                            </Row>
                            <Row className="p-4 pb-0 flex-column flex-flow-nowrap w-100">
                              <Row className="mb-4">
                                <DatePicker
                                  mode="date"
                                  disabledDate={disabledDate}
                                  dateRender={datePickerRender}
                                  value={moment(dateSelected, 'YYYY-MM-DD')}
                                  format={'YYYY-MM-DD'}
                                />
                              </Row>
                              <>
                                {(scheduleTutorByDateStatus ===
                                  ACTION_STATUS.PENDING &&
                                  [
                                    ...Array(freeTimesTutor?.length || 2),
                                  ].map((_, index) => (
                                    <Skeleton
                                      key={index}
                                      active
                                      paragraph={{ rows: 2 }}
                                    />
                                  ))) || (
                                  <Form
                                    form={form}
                                    id="form-group-time"
                                    onFinish={handleBookSchedule}
                                    onValuesChange={(_, allValues) => {
                                      handleDisableBtnBook(allValues);
                                    }}
                                  >
                                    <Collapse
                                      activeKey={(freeTimesTutor || []).map(
                                        (_, index) => index + 1,
                                      )}
                                    >
                                      {(freeTimesTutor || []).map(
                                        (time, index) => (
                                          <Panel
                                            showArrow={false}
                                            header={`${t('Common.From')} ${
                                              time.startTime
                                            } ${t('Common.to')} ${
                                              time.endTime
                                            }`}
                                            key={index + 1}
                                          >
                                            <Form.Item name={time.id}>
                                              <GroupSelectTime
                                                scheduleDetails={
                                                  time.scheduleDetails
                                                }
                                              />
                                            </Form.Item>
                                          </Panel>
                                        ),
                                      )}
                                    </Collapse>
                                    <ModalBookConfirm />
                                    <Row className="mt-4 justify-content-end">
                                      <Button
                                        icon={<CheckOutlined />}
                                        type="accent"
                                        htmlType="submit"
                                        form="form-group-time"
                                        disabled={!isShowedBtnBook}
                                      >
                                        {t('Common.book')}
                                      </Button>
                                    </Row>
                                  </Form>
                                )}
                              </>
                            </Row>
                          </Row>
                        )}
                        {(!isSelectDate &&
                          scheduleTutorIdStatus === ACTION_STATUS.PENDING && (
                            <Skeleton active paragraph={{ rows: 10 }} />
                          )) ||
                          (!isSelectDate && (
                            <Row className="tutor-calender">
                              <Calendar
                                dateFullCellRender={dateCellRender}
                                mode="month"
                              />
                            </Row>
                          ))}
                      </Row>
                    </Row>
                  </>
                )}
              </StyledTutorContent>
            </Row>
          </StyledProfile>
        </Col>
      </Row>
    </StyledTutorDetail>
  );
};

export default memo(TutorDetail);
