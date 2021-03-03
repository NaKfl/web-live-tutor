import { SmileOutlined } from '@ant-design/icons';
import Result from 'app/components/Result';
import Button from 'app/components/Button';

const StepWaiting = ({ ...rest }) => (
  <Result
    icon={<SmileOutlined />}
    title="Great, we have done all the operations!"
    extra={<Button type="primary">Next</Button>}
    {...rest}
  />
);

export default StepWaiting;
