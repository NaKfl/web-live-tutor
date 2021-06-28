import styled from 'styled-components';
import { Tag } from 'antd';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

export const CoverSearch = styled.div`
  margin-top: -35px;
  width: 100%;
  height: 100%;
  .ant-empty-footer {
    display: flex;
    justify-content: center;
  }
  .ant-carousel {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);
    overflow: hidden;
    margin-bottom: 30px;
  }
`;

export const SearchInput = styled.input``;

export const StyledIntro = styled.div`
  margin: 10px 0 5px 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  color: #3c3c3c;
  ${media.custom600px`
  font-size: 25px;
  `}
  ${media.custom400px`
  font-size: 20px;
  `}
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
