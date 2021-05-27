import styled from 'styled-components';

export const StyledWalletPanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);
  padding: 20px 30px;
  border-radius: 30px;
  width: ${({ width }) =>
    typeof width === 'string' && width.includes('%')
      ? `${width}`
      : width
      ? `${width}px`
      : `100%`};
  height: ${({ height }) =>
    typeof height === 'string' && height.includes('%')
      ? `${height}`
      : height
      ? `${height}px`
      : `100%`};
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: #2f252d;
    margin: 0;
  }

  span {
    font-size: 16px;
    color: #837b98;
    cursor: pointer;
  }
`;

export const StyledBody = styled.div`
  margin-top: 25px;
  flex: 1;
  overflow-y: hidden;
`;
