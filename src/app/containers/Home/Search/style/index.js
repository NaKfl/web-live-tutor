import styled from 'styled-components';

export const StyleWrapperSearch = styled.div`
  width: 100%;
  display: flex;
  height: 64px;
  border-radius: 8px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
`;

export const StyleWrapperInput = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  .icon-search {
    display: flex;
    align-items: center;
    font-size: 20px;
    transform: translateX(-8px);
  }
`;

export const StyleSearch = styled.input`
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 18px;
  padding-left: 30px;
  padding-right: 38px;
  background-color: #eff3f6;
  line-height: 24px;
  font-weight: 400;
  outline: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  transition: background-color 200ms ease, outline 200ms ease, color 200ms ease,
    box-shadow 200ms ease, -webkit-box-shadow 200ms ease;
  appearance: none;
  color: #0d0c22;
  letter-spacing: 1px;
  border: 1px;
  &::placeholder {
    color: #5f7d95;
  }
`;
