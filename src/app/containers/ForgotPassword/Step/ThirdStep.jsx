import { memo } from 'react';
import { ChangePassword } from '../UseForm';

export const ThirdStep = memo(({ onFinish }) => {
  return (
    <>
      <p>Enter the new password that you would like to use for your account.</p>
      <ChangePassword onFinish={onFinish}></ChangePassword>
    </>
  );
});

export default ThirdStep;
