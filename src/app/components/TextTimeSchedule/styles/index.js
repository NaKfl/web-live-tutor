import styled, { css } from 'styled-components';

export const StyledText = styled.span`
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 500;
  white-space: nowrap;
  ${({ color }) =>
    css`
      color: ${color};
    `}
`;
export const StyledTextTimeSchedule = styled.div`
  ${({ color }) =>
    css`
      background: ${color};
    `}
  margin-bottom: 5px;
  width: 93%;
  padding-top: 0px;
  height: 24px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;
