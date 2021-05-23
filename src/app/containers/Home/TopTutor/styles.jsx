import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledTopTutor = styled.div`
  border-bottom-right-radius: 5px;
  background-color: ${COLOR.WHITE};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0 0px 0px;
  .top-header {
    text-align: center;
    padding-bottom: 12px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: radial-gradient(
        ellipse at center,
        #ddd 0,
        hsla(0, 0%, 100%, 0) 100%
      );
    }
    p {
      margin: 0;
      font-size: 20px;
      letter-spacing: 1px;
      font-weight: 600;
    }
  }
  .top-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .ant-skeleton.ant-skeleton-with-avatar.ant-skeleton-active {
      margin-bottom: 8px;
      .ant-skeleton-content {
        .ant-skeleton-title {
          margin: 0 0 5px 0;
        }
        .ant-skeleton-paragraph {
          margin-top: 0;
        }
      }
    }
  }
  position: relative;
  &::after {
    width: 98%;
    height: 45px;
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      white 100%
    );
    z-index: 1;
  }
`;

export const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 23px;
    margin-right: 10px;
    text-align: center;
    font-size: 15px;
  }
  .medal {
    margin-right: 10px;
    margin-left: -7px;
    width: 30px;
  }
`;

export const StyledTopTutorItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 15px;
  padding: 9px 10px;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: radial-gradient(
      ellipse at center,
      #ddd 0,
      hsla(0, 0%, 100%, 0) 70%
    );
  }

  .info-group {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: ease 0.2s;
  }

  .partner-avatar {
  }

  .partner-name,
  .last-content {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: ${({ isBold }) => isBold && 600};
    .rate {
      font-size: 12px;
      li {
        margin-right: 2px;
      }
    }
  }
  .last-content {
    margin-bottom: 0;
    font-style: italic;
    font-size: 12px;
  }

  .partner-info {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .message-btn {
    margin-left: 8px;
  }

  .btn-group {
    margin-left: auto;
    & > * {
      font-size: 20px;
      opacity: 0.4;
      transition: ease 0.2s;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
