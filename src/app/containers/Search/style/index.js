import styled from 'styled-components';
import { Tag } from 'antd';
import { COLOR } from 'styles/colorPalette';
export const CoverSearch = styled.div`
  width: 100%;
  height: 100%;
  .ant-empty-footer {
    display: flex;
    justify-content: center;
  }
`;

export const SearchInput = styled.input``;

export const StyledIntro = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px 25px 20px;
  .title {
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 1.5px;
  }
  .sub-title {
    font-size: 24px;
    font-weight: 400;
  }
`;

export const StyledListTag = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  justify-content: center;
  .cover {
    max-width: 85%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & > * {
      margin: 5px 8px;
    }
  }
`;

export const StyledTag = styled(Tag)`
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color: ${COLOR.CORNFLOWER};
  color: ${COLOR.WHITE};
  span {
    display: flex;
    align-items: center;
    color: ${COLOR.WHITE};
    font-size: 18px;
  }
`;
