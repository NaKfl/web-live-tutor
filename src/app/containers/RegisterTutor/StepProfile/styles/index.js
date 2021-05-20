import styled from 'styled-components';
import { media } from 'styles/media';

export const Introduction = styled.div`
  display: flex;
  .intro-image {
    width: 115px;
    height: 117.31px;
    margin-right: 25px;
  }
`;

export const Content = styled.div`
  .avt-uploader {
    overflow: hidden;
    cursor: pointer;
  }

  .full-width {
    width: 100%;
    max-width: 100%;
    input,
    textarea {
      width: 100%;
    }
  }
  ${media.mobile`
  .basic-info {
    justify-content: center;
    .basic-info-left,
    .basic-info-right {
      flex: unset !important;
      max-width: 100%;
      .ant-alert-info{
        width: 222.66px;
        margin-bottom: 1rem;
      }
    }
  }
  `}
`;

export const StyledImageUpload = styled.div`
  width: 222.66px;
  height: 222.66px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  transition: 'border .24s ease-in-out';
  border: 2px dashed rgb(221, 221, 221);
  border-radius: 2px;
  color: #aaaaaa;
  margin-bottom: 2px;
`;
