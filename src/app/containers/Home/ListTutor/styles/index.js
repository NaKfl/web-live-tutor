import styled from 'styled-components';
import Badge from 'app/components/Badge';
import { media } from 'styles/media';
import { COLOR } from 'styles/colorPalette';
import { Row } from 'antd';

export const StyledTutorCard = styled.div`
  border-top: solid 4px ${COLOR.CORNFLOWER};
  cursor: pointer;
  display: flex;
  flex-flow: column;
  background-color: #fff;
  position: relative;
  width: 100%;
  padding: 20px;
  .w-100 {
    width: 100%;
  }
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);

  ${media.mobile`
  height:auto;
  `}

  .ant-skeleton {
    .ant-skeleton-content {
      .ant-skeleton-paragraph {
        margin-top: 25px;
      }
    }
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    ${media.mobile`
    flex-direction:column;
    align-items:center;
  `}
    .avatar {
      margin-right: 10px;
      min-width: 90px;
    }
    .info {
      margin-left: 12px;
      display: flex;
      flex-flow: column;
      width: 100%;
      ${media.mobile`
    flex-direction:column
    align-items:center;
    `}
      &-rate {
        font-size: 12px;
        margin-bottom: 0px;
        margin-bottom: 1px;
        li {
          margin-right: 4px;
          font-size: 12px;
        }
      }
      &-title {
        margin-bottom: 0px;
        width: 100%;
        font-size: 22px;
        font-weight: 600;
      }
    }
  }
  .header-right {
    & > * {
      transition: ease 0.4s;
    }
  }
`;

export const StyledMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .bio {
    width: 100%;
    font-size: 14px;
    font-weight: 400 !important;
    p {
      color: rgb(119, 119, 119);
    }
    height: 43px;
    overflow: hidden;
  }
  .control-layout {
    margin-top: 30px;
    .control {
      display: flex;
      justify-content: flex-end;
      bottom: 0;
      right: 0;
      & > * {
        margin-left: 10px;
      }
      ${media.mobile`
      position:relative;
      `}
    }
  }
`;

export const LayoutListTutor = styled.div`
  width: calc(100% + 20px);
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
`;

export const WrapTutor = styled.div`
  width: calc(100% / 3);
  padding: 0 10px 20px 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.subWide`
    width: calc(100% / 2);
  `}
  /* ${media.tablet`
    width: calc(100%);
  `} */
  ${media.mobile`
    width: calc(100%);
  `}
`;

export const InfoText = styled.p`
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
`;

export const StyledAvatar = styled.div`
  position: relative;
  height: fit-content;
`;

export const StyledBadge = styled(Badge)`
  position: absolute;
  right: -5px;
  bottom: 5px;

  .ant-badge-status-dot {
    display: inline-block;
    width: 15px;
    height: 15px;
  }
`;

export const StyledSpecialties = styled(Row)`
  & > div {
    margin-left: 0;
    margin-right: 8px;
  }
  max-height: 32px;
  overflow: hidden;
`;
