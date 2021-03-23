import styled from 'styled-components';
import Badge from 'app/components/Badge';
import { COLOR } from 'styles/colorPalette';

export const StyledWrapper = styled.div`
  background: transparent;
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StyledBadge = styled(Badge)`
  .ant-badge-count {
    top: 4px;
    right: 4px;
  }
  .message-button {
    background-color: ${COLOR.NICKEL};
    border-color: ${COLOR.NICKEL};
    box-shadow: 0px 4px 16px ${COLOR.SHADOW_BLACK};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 26px;
    .message-icon {
      transform: translateY(-1.75px);
      font-size: 34px;
    }
  }
`;
