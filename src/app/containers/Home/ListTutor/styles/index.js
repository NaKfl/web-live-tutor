import styled from 'styled-components';
import { media } from 'styles/media';
import { COLOR } from 'styles/colorPalette';

export const StyledTutorCard = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #fff;
  position: relative;
  height: 275px;
  width: 100%;
  padding: 25px;
  .w-100 {
    width: 100%;
  }
  border-radius: 5px;
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};

  ${media.mobile`
  height:auto;
  `}
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
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
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    ${media.mobile`
    flex-direction:column
    align-items:center;
    `}
    .rate {
      font-size: 12px;
    }
  }
  .mb-2 {
    margin-bottom: 0px;
    height: 30px;
    width: 100%;
  }
  .mail-btn {
    font-size: 24px;
    margin-right: 10px;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }

  .love {
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
    ${media.mobile`
    width:100%;
    position:absolute;
    display: flex;
    justify-content: flex-end;
    `}
  }
`;
export const StyledMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .bio {
    width: 100%;
    height: 100%;
    font-weight: 400 !important;
  }
  .control-layout {
    position: relative;
    width: 100%;
    height: 100%;
    .control {
      position: absolute;
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
