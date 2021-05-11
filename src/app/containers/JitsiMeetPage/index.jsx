import { JitsiMeet } from 'app/components/JitsiMeet';
import React, { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledMeetingPage } from './styles';

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
