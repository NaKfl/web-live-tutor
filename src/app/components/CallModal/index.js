import React, { memo } from 'react';
import { StyledModal, StyledAvatar } from './styles';

import { Row, Col, Avatar, DatePicker, Typography } from 'antd';
import moment from 'moment';
// import useHooks from './hooks';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks';
import Button from 'app/components/Button';
const { Title } = Typography;

const CallModal = memo(props => {
  const { t } = useTranslation();
  const { handlers, selectors } = useHooks(props);
  const { handleAcceptCall } = handlers;
  const { visible, onCancel, userCall, ...rest } = props;

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
              {`${userCall.name} đang gọi cho bạn.`}
            </Title>
            <Title className="text-description" level={5}>
              Cuộc gọi sẽ bắt đầu ngay khi bạn trả lời.
            </Title>
          </Row>
        </Row>
        <Row className="justify-content-end mt-3">
          <Button className="me-2" key="cancel">
            Từ chối
          </Button>
          <Button
            key="accept"
            type="accent"
            onClick={() => handleAcceptCall({ userCall })}
          >
            Chấp nhận
          </Button>
        </Row>
      </Row>
    </StyledModal>
  );
});

export default CallModal;
