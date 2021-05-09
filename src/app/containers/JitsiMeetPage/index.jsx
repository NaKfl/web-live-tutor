import { JitsiMeet } from 'app/components/JitsiMeet';
import React, { memo, useState } from 'react';
import useHooks from './hooks';
import { StyledMeetingPage } from './styles';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';

export const JitsiMeetPage = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks(props);
  const { roomInfo } = selectors;
  const { handleSomeOneLeave } = handlers;
  // const { t } = useTranslation();

  return (
    <StyledMeetingPage isTutor={roomInfo.isTutor}>
      {roomInfo.roomName && (
        <JitsiMeet
          roomName={roomInfo.roomName}
          displayName={roomInfo.displayName}
          disableInviteFunctions={true}
          onMeetingEnd={() => handleSomeOneLeave(roomInfo)}
          loadingComponent={<p>ʕ •ᴥ•ʔ jitsi is loading ...</p>}
        />
      )}
    </StyledMeetingPage>
  );
};

export default memo(JitsiMeetPage);
