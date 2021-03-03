import { Input } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  padding: 10px;
  border-radius: 6px;
`;

StyledInput.Password = styled(Input.Password)`
  padding: 10px;
  border-radius: 6px;
`;

StyledInput.TextArea = styled(Input.TextArea)`
  padding: 10px;
  border-radius: 6px;
`;

export { StyledInput };
