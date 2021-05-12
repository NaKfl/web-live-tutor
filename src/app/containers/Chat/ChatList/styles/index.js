import styled, { css } from 'styled-components';
import Badge from 'app/components/Badge';
import { COLOR } from 'styles/colorPalette';

export const StyledChatList = styled.div`
  position: relative;
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
  .close-btn {
    position: absolute;
    top: -6px;
    left: -5px;
    color: ${COLOR.NICKEL};
    background-color: ${COLOR.WHITE};
    border-radius: 50%;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
`;

export const StyledNav = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
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

  ${({ isActive }) =>
    isActive &&
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
    max-width: 115px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: ${({ isBold }) => isBold && 600};
  }
  .last-content {
    margin-bottom: 0;
    font-style: italic;
    font-size: 12px;
  }

  .partner-info {
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .delete-btn {
    font-size: 13px;
    margin-left: auto;
    opacity: 0.5;
    transition: ease 0.2s;
    &:hover {
      opacity: 1;
    }
  }
`;

export const StyledAvatar = styled.div`
  position: relative;
`;

export const StyledBadge = styled(Badge)`
  position: absolute;
  right: -9px;
  bottom: -2px;
  .ant-badge-status-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
  }
`;
