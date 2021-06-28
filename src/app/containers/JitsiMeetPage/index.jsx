import { Spin, Button as ButtonAntd } from 'antd';
import { JitsiMeet } from 'app/components/JitsiMeet';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledMeetingPage } from './styles';
import Button from 'app/components/Button';

export const JitsiMeetPage = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks(props);
  const {
    roomInfo,
    isLoading,
    isOnMobile,
    error,
    token,
    isContinueWeb,
  } = selectors;
  const { handleSomeOneLeave, endCall, continueGoToWeb } = handlers;
  const { t } = useTranslation();

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
      <StyledMeetingPage isTutor={roomInfo.isTutor}>
        {roomInfo.roomName && (
          <JitsiMeet
            roomName={roomInfo.roomName}
            jwt={roomInfo?.token}
            disableInviteFunctions={true}
            onMeetingEnd={() => endCall()}
            onSomeOneLeave={() => handleSomeOneLeave(roomInfo)}
            loadingComponent={<p>{t('Common.loading')}</p>}
          />
        )}
      </StyledMeetingPage>
    </Spin>
  );
};

export default memo(JitsiMeetPage);
