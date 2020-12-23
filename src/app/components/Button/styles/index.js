import styled from 'styled-components';
import { Button } from 'antd';
import { COLOR } from '../../../../styles/colorPalette';
import PropTypes from 'prop-types';

const primaryStyle = {
  'background-color': COLOR.HELIOTROPE,
  color: COLOR.WHITE,
  border: `1.5px solid ${COLOR.HELIOTROPE}`,
};
const accentStyle = {
  'background-color': COLOR.CORNFLOWER,
  color: COLOR.WHITE,
  border: `1.5px solid ${COLOR.CORNFLOWER}`,
};
const defaultStyle = {
  'background-color': COLOR.WHITE,
  color: COLOR.CORNFLOWER,
  border: `1.5px solid ${COLOR.CORNFLOWER}`,
  primary: {
    'background-color': COLOR.WHITE,
    color: COLOR.HELIOTROPE,
    border: `1.5px solid ${COLOR.HELIOTROPE}`,
  },
};
const configButton = ({ disable, size, type }) => {
  let config = { 'border-radius': '6px' };
  if (!disable) {
    switch (type) {
      case 'primary':
        return {
          ...primaryStyle,
          ...config,
        };
      case 'accent':
        return {
          ...accentStyle,
          ...config,
        };
      default:
        return {
          ...defaultStyle,
          ...config,
        };
    }
  }
  return config;
};
const configHover = ({ disable, type }) => {
  if (!disable) {
    switch (type) {
      case 'primary':
        return {
          ...defaultStyle.primary,
        };
      case 'accent':
        return {
          ...defaultStyle,
        };
      default:
        return {
          ...accentStyle,
        };
    }
  }
};
const configActive = ({ type }) => {
  switch (type) {
    case 'primary':
      return {
        ...defaultStyle.primary,
      };
    case 'accent':
      return {
        ...defaultStyle,
      };
    default:
      return {
        ...accentStyle,
      };
  }
};
export const StyledButton = styled(Button)`
  ${props => configButton(props)}
  padding:10px 20px !important;
  line-height: 1;
  &:hover {
    ${props => configHover(props)}
  }
  &:focus {
    ${props => configActive(props)}
  }
  height: 100%;
  display: flex;
  align-items: center;
`;
StyledButton.propTypes = {
  type: PropTypes.arrayOf(['primary', 'accent', 'default']),
};
