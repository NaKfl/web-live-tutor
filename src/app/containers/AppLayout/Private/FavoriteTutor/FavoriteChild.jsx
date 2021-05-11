import { Space } from 'antd';
import { memo } from 'react';
import Avatar from 'app/components/Avatar';
import { StyledFavoriteChild } from './styles';
import { MessageFilled } from '@ant-design/icons';
import { useControlChatPopup } from 'app/containers/Chat/hooks';

export const FavoriteChild = memo(props => {
  const { handleSetNewConversation } = useControlChatPopup();

  return (
    <StyledFavoriteChild>
      <Space className="left">
        <Avatar src={props.avatar} alt="avatar" />
        {props.name}
      </Space>
      <MessageFilled
        className="right"
        onClick={e => {
          e.stopPropagation();
          handleSetNewConversation(props);
        }}
      />
    </StyledFavoriteChild>
  );
});
