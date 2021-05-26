import styled from 'styled-components';

export const StyledTransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledUpDownIcon = styled.div`
  padding: 20px;
  background-color: ${({ isUp }) => (isUp ? '#EEF7F7' : '#FFF0EC')};
  color: ${({ isUp }) => (isUp ? '#55BCB3' : '#FC7067')};
  border-radius: 5px;
`;

export const StyledInfo = styled.div`
  overflow: hidden;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    color: #5f555b;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
  }
  span {
    font-size: 15px;
    color: #7d7489;
  }
`;

export const StyledLeftPart = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
`;

export const StyledPrice = styled.div`
  font-weight: 600;
  color: ${({ isUp }) => (isUp ? '#55BCB3' : '#FC7067')};
  font-size: 16px;
`;
