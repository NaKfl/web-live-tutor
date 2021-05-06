import { COLOR } from 'styles/colorPalette';

const TYPE = ['accent', 'default', 'primary'];
const styleDefault = {
  padding: '10px 20px !important',
  'line-height': '15px',
  height: '100%',
  display: 'flex',
  'align-items': 'center',
  'border-radius': '6px',
};

const buttonType = {
  primary: {
    'background-color': COLOR.HELIOTROPE,
    color: COLOR.WHITE,
    border: `1.5px solid ${COLOR.HELIOTROPE}`,
  },
  accent: {
    'background-color': COLOR.CORNFLOWER,
    color: COLOR.WHITE,
    border: `1.5px solid ${COLOR.CORNFLOWER}`,
  },
  default: {
    'background-color': COLOR.WHITE,
    color: COLOR.CORNFLOWER,
    border: `1.5px solid ${COLOR.CORNFLOWER}`,
  },
};

// const buttonSize = {
//   small: {
//     height,
//   },
// };

const buttonLoading = {
  'max-height': '36.6px !important',
};

export const buttonStyle = ({ type, loading }) => {
  return {
    ...(loading && buttonLoading),
    ...styleDefault,
    ...(TYPE.includes(type) ? buttonType[type] : buttonType.default),
  };
};
