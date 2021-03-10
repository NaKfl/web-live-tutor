import styled from 'styled-components';

export const Introduction = styled.div`
  display: flex;
  .intro-image {
    width: 115px;
    height: 117.31px;
    margin-right: 25px;
  }
`;

export const Content = styled.div`
  .full-width {
    width: 100%;
    max-width: 100%;
    input,
    textarea {
      width: 100%;
    }
  }
`;

// export const ImageUpload = styled.div`
//   width: 222.66px;
//   height: 222.66px;
//   border: 1px solid rgb(221, 221, 221);
//   margin-bottom: 5px;
// `;

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
