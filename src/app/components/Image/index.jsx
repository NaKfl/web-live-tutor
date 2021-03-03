import { StyledImage } from './styles';
import { memo } from 'react';

const Image = ({ ...rest }) => {
  return <StyledImage preview={false} {...rest} />;
};

export default memo(Image);
