import Button from 'app/components/Button';
import Steps from 'app/components/Steps';
import StepProfile from './StepProfile';
import StepVideo from './StepVideo';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks, { useUnmount } from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledRegisterTutor, StepsContent, StepsAction } from './styles';

const { Step } = Steps;

export const RegisterTutor = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  useUnmount();
  const { prevStep, nextStep, onFinish, selectAvatar, selectVideo } = handlers;
  const { tutorFormValues, currentStep, formProfile } = selectors;
  const { t } = useTranslation();

  const steps = [
    {
      title: t('Register.Tutor.completeProfile'),
      content: (
        <StepProfile
          formProfile={formProfile}
          tutorFormValues={tutorFormValues}
          selectAvatar={selectAvatar}
        />
      ),
    },
    {
      title: t('Register.Tutor.videoIntroduction'),
      content: <StepVideo selectVideo={selectVideo} />,
    },
  ];

  return (
    <StyledRegisterTutor>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <StepsContent>{steps[currentStep].content}</StepsContent>
      <StepsAction>
        {currentStep > 0 && (
          <Button
            type="default"
            style={{ marginRight: '8px' }}
            onClick={() => prevStep()}
          >
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="accent" onClick={() => nextStep()}>
            Next
          </Button>
        )}

        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={onFinish}>
            Done
          </Button>
        )}
      </StepsAction>
    </StyledRegisterTutor>
  );
});

export default RegisterTutor;
