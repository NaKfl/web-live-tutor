import { JitsiMeet } from 'app/components/JitsiMeet';
import React, { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledMeetingPage } from './styles';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

export const JitsiMeetPage = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks(props);
  const { roomInfo, isLoading } = selectors;
  const { handleSomeOneLeave } = handlers;
  const { t } = useTranslation();

  return (
    <Spin spinning={isLoading} tip={`${t('Common.backToHome')} ...`}>
      <StyledMeetingPage isTutor={roomInfo.isTutor}>
        {roomInfo.roomName && (
          <JitsiMeet
            roomName={roomInfo.roomName}
            userInfo={roomInfo.userInfo}
            disableInviteFunctions={true}
            onMeetingEnd={() => handleSomeOneLeave(roomInfo)}
            loadingComponent={<p>ʕ •ᴥ•ʔ jitsi is loading ...</p>}
          />
        )}
      </StyledMeetingPage>
    </Spin>
  );
};

export default memo(JitsiMeetPage);
