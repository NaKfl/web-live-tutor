import { Avatar, Row, Typography } from 'antd';
import Button from 'app/components/Button';
import React, { memo } from 'react';
import useHooks from './hooks';
import { StyledAvatar, StyledModal } from './styles';
import ReactAudioPlayer from 'react-audio-player';
import audioFile from 'assets/mp3/audioCall.mp3';
import callingFile from 'assets/mp3/calling.m4a';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const CallModal = memo(props => {
  const { handlers } = useHooks(props);
  const { handleAcceptCall, handleRejectCall, handleSelfCancelCall } = handlers;
  const { visible, onCancel, userCall, ...rest } = props;
  const { t } = useTranslation();
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
        src={userCall.isReceived ? audioFile : callingFile}
        loop
        autoPlay
        controls
      />
      <Row className="flex-column">
        <Title level={3}>
          {userCall.isReceived
            ? t('CallModal.incomingCall')
            : t('CallModal.outgoingCall')}
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
          <Row className="p-2 flex-column">
            <Title className="" level={4}>
              {userCall.isReceived
                ? `${userCall?.name} ${t('CallModal.isCallingTo')} ${t(
                    'CallModal.you',
                  )}.`
                : `${t('CallModal.You')} ${t('CallModal.areCallingTo')} ${
                    userCall?.name
                  }.`}
            </Title>
            <Title className="text-description" level={5}>
              {userCall.isReceived
                ? `${t('CallModal.callingStart')} ${t('CallModal.you')} ${t(
                    'CallModal.answer',
                  )}.`
                : `${t('CallModal.callingStart')} ${t('CallModal.tutor')} ${t(
                    'CallModal.answers',
                  )}.`}
            </Title>
          </Row>
        </Row>
        <Row className="mt-3 justify-content-end">
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
            {userCall.isReceived
              ? t('CallModal.reject')
              : t('CallModal.cancel')}
          </Button>
          {userCall.isReceived && (
            <Button
              key="accept"
              type="accent"
              onClick={() => handleAcceptCall({ userCall })}
            >
              {t('CallModal.accept')}
            </Button>
          )}
        </Row>
      </Row>
    </StyledModal>
  );
});

export default CallModal;
