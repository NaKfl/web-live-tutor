import { Avatar, Row, Typography } from 'antd';
import Button from 'app/components/Button';
import React, { memo } from 'react';
import useHooks from './hooks';
import { StyledAvatar, StyledModal } from './styles';

const { Title } = Typography;

const CallModal = memo(props => {
  const { handlers } = useHooks(props);
  const { handleAcceptCall, handleRejectCall } = handlers;
  const { visible, onCancel, userCall, userBeCalled, ...rest } = props;

  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={false}
      {...rest}
    >
      <Row className="flex-column">
        <Title level={3}>Cuộc gọi đến</Title>
        <Row className="align-items-center">
          <StyledAvatar>
            <Avatar
              src={
                'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png'
              }
              shape="circle"
              size={80}
              className="avatar"
            />
          </StyledAvatar>
          <Row className="flex-column p-2">
            <Title className="" level={4}>
              {`${userCall?.name} đang gọi cho bạn.`}
            </Title>
            <Title className="text-description" level={5}>
              Cuộc gọi sẽ bắt đầu ngay khi bạn trả lời.
            </Title>
          </Row>
        </Row>
        <Row className="justify-content-end mt-3">
          <Button
            className="me-2"
            key="cancel"
            onClick={() => {
              handleRejectCall({ userCall });
              onCancel();
            }}
          >
            Từ chối
          </Button>
          <Button
            key="accept"
            type="accent"
            onClick={() => handleAcceptCall({ userCall, userBeCalled })}
          >
            Chấp nhận
          </Button>
        </Row>
      </Row>
    </StyledModal>
  );
});

export default CallModal;
