import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const CoverFilter = styled.div`
  height: 100%;
  width: 120px;
  padding: 8px 12px;
  position: relative;
  border: 1px solid #efefef;
  margin-right: 8px;
  background-color: ${COLOR.CORNFLOWER};
  border-radius: 8px;
  color: ${COLOR.WHITE};
`;

export const Filter = styled.div`
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;
  line-height: 24px;
  padding: 0 5px;
  letter-spacing: 1.5px;
  font-weight: 400;
  transition: background-color 200ms ease, outline 200ms ease, color 200ms ease,
    box-shadow 200ms ease, -webkit-box-shadow 200ms ease;
  p {
    font-size: 18px;
    padding: 0;
    margin: 0;
  }
`;
