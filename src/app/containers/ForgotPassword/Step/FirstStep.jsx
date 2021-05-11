import { memo } from 'react';
import { InputEmailForm } from '../UseForm';

export const FirstStep = memo(({ onFinish }) => {
  return (
    <>
      <p>
        Enter the email address associated with your Etutor account and we’ll
        send you a reset link.
      </p>
      <InputEmailForm onFinish={onFinish}></InputEmailForm>
    </>
  );
});

export default FirstStep;
