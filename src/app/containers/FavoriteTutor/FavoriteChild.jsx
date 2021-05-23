import { Space } from 'antd';
import { memo } from 'react';
import Avatar from 'app/components/Avatar';
import { StyledFavoriteChild } from './styles';
import { MessageFilled } from '@ant-design/icons';
import { useControlChatPopup } from 'app/containers/Chat/hooks';
import { useShowInfoTutor } from 'app/containers/Home/ListTutor/hooks';

export const FavoriteChild = memo(props => {
  const { handleSetNewConversation } = useControlChatPopup();
  const { showInfoTutor } = useShowInfoTutor();

  return (
    <StyledFavoriteChild onClick={() => showInfoTutor({ userId: props.id })}>
      <Space className="left">
        <Avatar src={props.avatar} alt="avatar" />
        {props.name}
      </Space>
      <MessageFilled
        className="right"
        onClick={e => {
          e.stopPropagation();
          handleSetNewConversation({ userId: props.id, ...props });
        }}
      />
    </StyledFavoriteChild>
  );
});
