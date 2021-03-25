import { JitsiMeet } from 'app/components/JitsiMeet';
import React, { memo, useState } from 'react';
import useHooks from './hooks';
import { StyledMeetingPage } from './styles';

export const JitsiMeetPage = props => {
  const { handlers, selectors } = useHooks(props);
  const { roomInfo } = selectors;
  // const { t } = useTranslation();

  return (
    <StyledMeetingPage isTutor={roomInfo.isTutor}>
      {roomInfo.roomName && (
        <JitsiMeet
          roomName={roomInfo.roomName}
          password={roomInfo.password}
          displayName={roomInfo.displayName}
          disableInviteFunctions={true}
          onMeetingEnd={() => console.log('Meeting has ended')}
          loadingComponent={<p>ʕ •ᴥ•ʔ jitsi is loading ...</p>}
        />
      )}
    </StyledMeetingPage>
  );
};

export default memo(JitsiMeetPage);
