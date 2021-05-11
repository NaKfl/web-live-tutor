import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledMenuBar = styled.div`
  .menu-list {
    display: flex;
    margin: 0;

    .menu-item {
      cursor: pointer;
      margin-right: 20px;
      font-size: 17px;
      transform: translateY(4px);
      border-bottom: inset 2px transparent;
      color: ${COLOR.BOULDER};
      transition: none;
      a {
        color: ${COLOR.BOULDER};
      }
      &:hover {
        color: ${COLOR.CORNFLOWER};
        color: ${COLOR.CORNFLOWER};
        a {
          color: ${COLOR.CORNFLOWER};
        }
      }
    }
    .menu-item-active {
      border-bottom: inset 2px ${COLOR.CORNFLOWER};
      color: ${COLOR.CORNFLOWER};
      color: ${COLOR.CORNFLOWER};
      a {
        color: ${COLOR.CORNFLOWER};
      }
    }
  }
`;
