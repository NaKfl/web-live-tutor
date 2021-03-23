import styled, { css } from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledChatList = styled.div`
  display: flex;
  width: 600px;
  height: 400px;
  transform: translate(-28px, 27px);
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_BLACK};
  background-color: ${COLOR.WHITE};
  border-radius: 6px;
  .chat-window {
    flex: 1;
  }
`;

export const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: scroll;
`;

export const StyledNavItem = styled.div`
  padding: 9px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 6px;
  transition: ease 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.LIGHT_NICKEL};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${COLOR.NICKEL};
      color: ${COLOR.WHITE};
      &:hover {
        background-color: ${COLOR.NICKEL};
      }
    `}

  .partner-avatar {
    margin-right: 10px;
  }

  .partner-name,
  .last-content {
    width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .last-content {
    margin-bottom: 0;
    font-style: italic;
    font-size: 13px;
  }

  .partner-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
