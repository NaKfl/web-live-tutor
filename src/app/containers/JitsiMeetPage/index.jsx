import { Button as ButtonAntd, Progress, Spin } from 'antd';
import Button from 'app/components/Button';
import { JitsiMeet } from 'app/components/JitsiMeet';
import React, { memo } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks';
import { StyledCountDown, StyledMeetingPage } from './styles';

export const JitsiMeetPage = props => {
  const { handlers, selectors } = useHooks(props);
  const {
    roomInfo,
    isLoading,
    isOnMobile,
    error,
    token,
    isContinueWeb,
    childJitsiRef,
  } = selectors;
  const {
    handleSomeOneLeave,
    endCall,
    continueGoToWeb,
    handleParticipantJoin,
  } = handlers;
  const { t } = useTranslation();

  const renderer = ({ hours, minutes, seconds, completed }) => {
    // Render a countdown
    const totalSecond = roomInfo.totalTime;
    const current = parseInt(minutes) * 60.0 + parseInt(seconds);
    const percent = 100.0 - (current * 100.0) / totalSecond;
    return (
      <StyledCountDown>
        <Progress
          type="circle"
          width={50}
          strokeColor={'#6979F8'}
          percent={percent}
          format={() => ` ${zeroPad(minutes)}:${zeroPad(seconds)}`}
        />
      </StyledCountDown>
    );
  };

  if (error)
    return (
      <Spin
        spinning
        tip={
          <>
            <p style={{ marginTop: 20 }}>{error}</p>
            <p>{t('Jitsi.backToHome')}</p>
          </>
        }
      >
        <StyledMeetingPage />
      </Spin>
    );

  if (isOnMobile && !isContinueWeb)
    return (
      <StyledMeetingPage>
        <a href={`livetutoring://call?token=${token}`}>
          <Button type="accent">{t('Jitsi.gotToApp')}</Button>
        </a>
        <div>
          <ButtonAntd type="link" onClick={continueGoToWeb}>
            {t('Jitsi.continueGoToWeb')}
          </ButtonAntd>
        </div>
      </StyledMeetingPage>
    );

  return (
    <Spin
      spinning={isLoading}
      tip={<p style={{ marginTop: 20 }}>{t('Jitsi.backToHome')}</p>}
    >
      {roomInfo?.remainTime && (
        <Countdown
          date={Date.now() + parseInt(roomInfo?.remainTime) * 1000}
          onComplete={() => {
            childJitsiRef.current.exeEndCall();
          }}
          renderer={renderer}
        />
      )}

      <StyledMeetingPage isTutor={roomInfo.isTutor}>
        {roomInfo.roomName && (
          <JitsiMeet
            ref={childJitsiRef}
            roomName={roomInfo.roomName}
            jwt={roomInfo?.token}
            disableInviteFunctions={true}
            onMeetingEnd={() => endCall(roomInfo)}
            onVideoConferenceJoin={() => {}}
            onParticipantJoin={() => {
              handleParticipantJoin();
            }}
            onSomeOneLeave={() => handleSomeOneLeave(roomInfo)}
            loadingComponent={<p>{t('Common.loading')}</p>}
          />
        )}
      </StyledMeetingPage>
    </Spin>
  );
};

export default memo(JitsiMeetPage);
