import Button from 'app/components/Button';
import Form from 'app/components/Form';
import StyledInput from 'app/components/Input';
import { memo } from 'react';

export const InputEmailForm = memo(({ onFinish }) => {
  return (
    <Form onFinish={onFinish} layout="vertical" className="form">
      <Form.Item label="Email" name="email">
        <StyledInput></StyledInput>
      </Form.Item>
      <Form.Item>
        <div className="button">
          <Button type="accent" htmlType="submit">
            Send reset link
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});

export const ChangePassword = memo(({ onFinish }) => {
  return (
    <Form onFinish={onFinish} layout="vertical" className="form">
      <Form.Item label="Email" name="email">
        <StyledInput></StyledInput>
      </Form.Item>
      <Form.Item label="Password" name="password">
        <StyledInput.Password></StyledInput.Password>
      </Form.Item>
      <Form.Item label="Confirm Password" name="password2">
        <StyledInput.Password></StyledInput.Password>
      </Form.Item>
      <Form.Item>
        <div className="button">
          <Button type="accent" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});
