import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .full-width {
    width: 100%;
    max-width: 100%;
    input,
    textarea {
      width: 100%;
    }
  }
`;

export const VideoUpload = styled.div`
  width: 500px;
  height: 293px;
  border: 1px solid rgb(221, 221, 221);
  margin: 10px 0;
`;

export const StyledVideoUpload = styled.div`
  width: 500px;
  height: 293px;
  border: 1px solid rgb(221, 221, 221);
  margin: 10px 0;
`;
