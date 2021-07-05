import { Row } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import Button from 'app/components/Button';
import React, { memo } from 'react';
import { StyledHeaderTable, StyledModal } from './styles';
import { useTranslation } from 'react-i18next';

import historyIcon from 'assets/svg/outgoing_call.svg';
import socket from 'utils/socket';

const ConfirmCallModal = memo(props => {
  const { visible, onCancel, tutor, ...rest } = props;
  const { t } = useTranslation();
  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      footer={false}
      {...rest}
    >
      <StyledHeaderTable>
        <div className="left-header">
          <img className="image" src={historyIcon} alt="calendar" />
          <div className="content">
            <h2>{t('ConfirmCall.title')}</h2>
            <p>{t('ConfirmCall.guide')}</p>
            <p>{t('ConfirmCall.subGuide')}</p>
          </div>
        </div>
      </StyledHeaderTable>
      <Row className="mt-3 justify-content-end">
        <Button className="me-2" key="cancel" onClick={() => onCancel()}>
          {t('ConfirmCall.cancel')}
        </Button>
        <Button
          key="accept"
          type="accent"
          icon={<PhoneOutlined />}
          onClick={() => {
            onCancel();
            socket.emit('call:callVideo', { userId: tutor.userId });
          }}
        >
          {t('ConfirmCall.call')}
        </Button>
      </Row>
    </StyledModal>
  );
});

export default ConfirmCallModal;
