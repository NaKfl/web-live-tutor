import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

export const StyledMoreMenus = styled.div`
  height: calc(100vh - 2 * 70px);
  margin-top: 70px;
  padding: 10px 50px;
  ${media.custom500px`
    padding: 10px 5px;
  `}
`;

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  width: 100%;
  border-radius: 10px;
  transition: ease 0.2s;

  &:hover {
    background-color: #e4e6eb;
  }

  .text {
    font-weight: 600;
    font-size: 15px;
    margin-left: 15px;
  }

  .icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: ${COLOR.CORNFLOWER};
    &.small {
      padding: 3px;
    }
  }
`;
