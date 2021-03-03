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
const { Title } = Typography;

const Confirm = memo(props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks(props);
  const { onSelectDate, handleBackSelectDate } = handlers;
  const { isSelectDate } = selectors;
  const { visible, onCancel, user, ...rest } = props;
  // const { status } = user;
  // const {
  //   name,
  //   email,
  //   avatar,
  //   point,
  //   createdAt,
  //   totalMatches,
  //   winMatches,
  // } = userInfo;

  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Return
        </Button>,
      ]}
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
              <CloseOutlined />
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
                    src={
                      'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png'
                    }
                    shape="circle"
                    size={90}
                    className="avatar"
                  />
                </StyledAvatar>
              </Col>
              <Col className="group-info d-flex justify-content-center">
                <Title level={3}>Will Harriman</Title>
                <Row className="country">
                  <Image
                    preview={false}
                    src={
                      'https://www.cambly.com/static/images/country-flag-icons/US.png'
                    }
                  />
                  <Title level={5} className="d-flex align-items-center">
                    London, England, UK
                  </Title>
                </Row>
              </Col>
            </Row>
            <Row className="tutor-info d-flex">
              <Button type="accent">CALL NOW</Button>
            </Row>
          </StyledTutorTitle>
          <StyledTutorContent {...rest}>
            <hr></hr>
            <Row className="mb-4 intro-video-section">
              <video
                className="video-tutor"
                src="https://d1z2nqdm9ph1g6.cloudfront.net/602d01a80e7f57fcd520e92a/602d01a80e7f57fcd520e92a?Expires=1614700263&Signature=QrkPwKB9RWyGVW0qVytEN1PTauJ1Zlmcuej3IznW8jj0hCLx9LHqJQmYwBEcaaLam9k15PK3KnOSORcGYAauWd4S1H3oMgeME3TjzCKqSDYFctvJmtpPnmmWI4m-zd8S0ji-ScEqQa~jMsFZQOMJjMaeMFKCeIPQFFWHkd40F0M5r~-9o85A9ofkcrdY3Hv8RpGMbab-xACCwvd86U87VJT8jTovkcPdRnz6ORti5U1yVtwyaIeh~Gz0FkPfIy3AbS9rKYHADM5lkL1ZBCtxame3IeLc0lwhvYfxWArFq7qcXz66vULe4yrsraCTIoMJ7p8PWs-vDK4tJx6EeXJlnQ__&Key-Pair-Id=APKAIKYVFETQQHXNXQ5Q"
                controlslist="nodownload"
                controls
              ></video>
            </Row>
            <Row className="intro-badge">
              <Rate disabled defaultValue={5} className="rate mb-2" />
            </Row>
            <Row className="intro-section">
              <Title level={5}>
                If you're looking for en experience ESL instructor? That's me!
                I've had over ten years experience in teaching at all levels!"
              </Title>
            </Row>
            <hr></hr>
            <Row className="intro-about flex-column">
              <Title level={4}>About Me</Title>
              <Row>
                <Title level={5}>Languages</Title>
              </Row>
              <Row className="mb-1">
                <TextHighlight content={'English'} />
                <TextHighlight content={'English'} />
                <TextHighlight content={'English'} />
              </Row>
              <Row>
                <Title level={5}>Languages</Title>
              </Row>
              <Row className="mb-1">
                <TextHighlight content={'Business English'} />
                <TextHighlight content={'Business English'} />
                <TextHighlight content={'Business English'} />
              </Row>
              <Row>
                <Title level={5}>Interests</Title>
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
              <Title level={4}>Resume</Title>
              <Row>
                <Title level={5}>Teaching Experience</Title>
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
            <Row className="intro-schedule flex-column">
              <Title level={4}>Schedule</Title>
              <Row>
                {isSelectDate && <Title level={5}>Select time a slot</Title>}
                {!isSelectDate && <Title level={5}>Select a day</Title>}
              </Row>
              <Row className="group-tutor-calender">
                {isSelectDate && (
                  <Row className="tutor-calender">
                    <Row
                      className="btn-back pointer align-items-center"
                      onClick={handleBackSelectDate}
                    >
                      <ArrowLeftOutlined /> <span>Back</span>
                    </Row>
                    <Row className="flex-column w-100 p-4">
                      <DatePicker
                        className="w-50 mb-4"
                        defaultValue={moment('2015/01/01', 'YYYY/MM/DD')}
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

export default Confirm;
