import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledChatList = styled.div`
  width: 600px;
  height: 400px;
  transform: translate(-28px, 27px);
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_BLACK};
  background-color: ${COLOR.WHITE};
  border-radius: 6px;
  .ant-tabs-ink-bar {
    display: none;
  }
  .ant-tabs-nav {
    height: 400px;
    .ant-tabs-nav-more {
      display: none;
    }
    .ant-tabs-tab {
      border-radius: 6px;
      transition: ease 0.2s;
    }
  }
  .ant-tabs-tab:hover {
    background-color: ${COLOR.LIGHT_NICKEL};
  }
  .ant-tabs-nav-list {
    .ant-tabs-tab:hover,
    .ant-tabs-tab-btn:focus,
    .ant-tabs-tab-remove:focus,
    .ant-tabs-tab-btn:active,
    .ant-tabs-tab-remove:active {
      color: unset;
    }
    .ant-tabs-tab-active {
      background-color: ${COLOR.NICKEL};
      .ant-tabs-tab-btn {
        color: ${COLOR.WHITE};
      }
    }
  }
`;

export const StyledNavItem = styled.div`
  padding: 2px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .partner-avatar {
    margin-right: 10px;
  }

  .partner-name,
  .last-content {
    max-width: 150px;
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
