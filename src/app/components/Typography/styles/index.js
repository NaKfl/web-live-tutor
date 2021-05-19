import styled from 'styled-components';
import { Typography } from 'antd';
import { COLOR } from 'styles/colorPalette';
const { Title } = Typography;
const sizeTitle = ({ level }) => {
  let config = {
    'font-size': '',
    'line-height': '',
  };
  const setConfig = (a, b) => {
    config['font-size'] = `${a}px`;
    config['line-height'] = `${b}px`;
  };
  switch (level) {
    case 1:
      setConfig(34, 41);
      break;
    case 2:
      setConfig(22, 28);
      break;
    case 3:
      setConfig(17, 22);
      break;
    case 4:
      setConfig(15, 20);
      break;
    default:
      setConfig(15, 20);
      break;
  }
};
export const StyledTitle = styled(Title)`
  ${props => sizeTitle(props)}
  color:${COLOR.VIOLET} !important;
  ${props => props.style}
`;
