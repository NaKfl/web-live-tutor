import { Space } from 'antd';
import { memo } from 'react';
import Avatar from 'app/components/Avatar';
import { PhoneOutlined } from '@ant-design/icons';
export const FavoriteChild = memo(props => {
  return (
    <Space>
      <Space>
        <Avatar src={props.avatar} alt="avatar"></Avatar>
        {props.name}
      </Space>
      <PhoneOutlined style={{ fontSize: '24px' }}></PhoneOutlined>
    </Space>
  );
});
