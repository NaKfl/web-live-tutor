import { Image } from 'antd';
import styled from 'styled-components';

export const StyledImage = styled(Image)`
  & img {
    max-height: 500px;
    max-width: 500px;
    height: 100%;
    width: 100%;
  }
`;
