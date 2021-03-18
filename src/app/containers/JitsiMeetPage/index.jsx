import { JitsiMeet } from 'app/components/JitsiMeet';
import React, { memo, useState } from 'react';
// import Button from 'app/components/Button';
// import Form from 'app/components/Form';
// import Input from 'app/components/Input';
// import DatePicker from 'app/components/DatePicker';
// import { Avatar } from 'antd';
// import { Row, Col } from 'app/components/Grid';
// import useHooks from './hooks';
// import saga from './saga';
// import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
// import { reducer, sliceKey } from './slice';
// import {
//   StyledAvatar,
//   StyledProfile,
//   StyledEditIcon,
//   StyledIconEdit,
// } from './styles';
// import { useTranslation } from 'react-i18next';
// import { Typography } from 'antd';
// import UploadAvatar from './UploadAva';
// const { Title } = Typography;

export const JitsiMeetPage = () => {
  // useInjectSaga({ key: sliceKey, saga });
  // useInjectReducer({ key: sliceKey, reducer });
  // const { handlers, selectors } = useHooks();
  // const { onFinish, openModal, modalControl } = handlers;
  // const { info, form, loading, avatarUploadVisible, loadingUpload } = selectors;
  // const { t } = useTranslation();

  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [call, setCall] = useState(false);
  const [password, setPassword] = useState('');

  const handleClick = event => {
    event.preventDefault();
    if (room && name) setCall(true);
  };
  return (
    <div>
      <h2>&lt;Jutsu /&gt; Demo !</h2>
      {call ? (
        <JitsiMeet
          roomName={room}
          password={password}
          displayName={name}
          onMeetingEnd={() => console.log('Meeting has ended')}
          loadingComponent={<p>ʕ •ᴥ•ʔ jitsi is loading ...</p>}
        />
      ) : (
        <form>
          <input
            id="room"
            type="text"
            placeholder="Room"
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            id="password"
            type="text"
            placeholder="Password (optional)"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleClick} type="submit">
            Start / Join
          </button>
        </form>
      )}
    </div>
  );
};

export default memo(JitsiMeetPage);
