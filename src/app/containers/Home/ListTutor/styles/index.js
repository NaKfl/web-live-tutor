import styled from 'styled-components';
import { Row } from 'antd';

export const StyledTutorCard = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #fff;
  position: relative;
  height: 275px;
  padding: 25px;
  .w-100 {
    width: 100%;
  }
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 15px -3px;
`;
export const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  position: relative;
  margin-bottom: 10px;
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
    .rate {
      font-size: 12px;
    }
  }
  .mb-2 {
    margin-bottom: 0px;
    height: 30px;
    width: 100%;
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
    }
  }
`;
export const LayoutListTutor = styled(Row)`
  width: 100%;
  height: 100%;
`;
export const InfoText = styled.p`
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
`;
