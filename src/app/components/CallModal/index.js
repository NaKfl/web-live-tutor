import { Avatar, Row, Typography } from 'antd';
import Button from 'app/components/Button';
import React, { memo } from 'react';
import useHooks from './hooks';
import { StyledAvatar, StyledModal } from './styles';
import ReactAudioPlayer from 'react-audio-player';
import audioFile from 'assets/mp3/audioCall.mp3';

const { Title } = Typography;

const CallModal = memo(props => {
  const { handlers } = useHooks(props);
  const { handleAcceptCall, handleRejectCall, handleSelfCancelCall } = handlers;
  const { visible, onCancel, userCall, ...rest } = props;

  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      footer={false}
      {...rest}
    >
      <ReactAudioPlayer
        style={{ display: 'none' }}
        src={audioFile}
        loop
        autoPlay
        controls
      />
      <Row className="flex-column">
        <Title level={3}>
          {userCall.isReceived ? 'Cuộc gọi đến' : 'Cuộc gọi đi'}
        </Title>
        <Row className="align-items-center">
          <StyledAvatar>
            <Avatar
              src={userCall?.avatar}
              shape="circle"
              size={80}
              className="avatar"
            />
          </StyledAvatar>
          <Row className="flex-column p-2">
            <Title className="" level={4}>
              {userCall.isReceived
                ? `${userCall?.name} đang gọi cho bạn.`
                : `Bạn đang gọi cho ${userCall?.name}.`}
            </Title>
            <Title className="text-description" level={5}>
              {userCall.isReceived
                ? `Cuộc gọi sẽ bắt đầu ngay khi bạn trả lời.`
                : `Cuộc gọi sẽ bắt đầu ngay khi gia sư trả lời.`}
            </Title>
          </Row>
        </Row>
        <Row className="justify-content-end mt-3">
          <Button
            className="me-2"
            key="cancel"
            onClick={() => {
              if (userCall.isReceived) {
                handleRejectCall({ userCall });
              } else {
                handleSelfCancelCall({ userCall });
              }
              onCancel();
            }}
          >
            {userCall.isReceived ? `Từ chối` : `Hủy`}
          </Button>
          {userCall.isReceived && (
            <Button
              key="accept"
              type="accent"
              onClick={() => handleAcceptCall({ userCall })}
            >
              Chấp nhận
            </Button>
          )}
        </Row>
      </Row>
    </StyledModal>
  );
});

export default CallModal;
