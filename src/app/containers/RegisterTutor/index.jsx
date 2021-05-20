import Button from 'app/components/Button';
import Steps from 'app/components/Steps';
import StepProfile from './StepProfile';
import StepVideo from './StepVideo';
import StepWaiting from './StepWaiting';
import React, { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks, { useUnmount } from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledRegisterTutor, StepsContent, StepsAction } from './styles';
import { ACTION_STATUS } from 'utils/constants';

const { Step } = Steps;

export const RegisterTutor = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  useUnmount();
  const {
    prevStep,
    nextStep,
    onFinish,
    selectAvatar,
    selectVideo,
    setCurrentStep,
  } = handlers;
  const { tutorFormValues, currentStep, formProfile, status, user } = selectors;
  const { t } = useTranslation();

  const steps = useMemo(
    () => [
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
      {
        title: t('Register.Tutor.stepApproval'),
        content: <StepWaiting />,
      },
    ],
    [formProfile, selectAvatar, selectVideo, t, tutorFormValues],
  );

  useEffect(() => {
    if (user?.tutorInfo && !user.tutorInfo.isActivated)
      setCurrentStep(steps.length - 1);
  }, [setCurrentStep, steps.length, user.tutorInfo]);

  return (
    <StyledRegisterTutor>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <StepsContent>{steps[currentStep].content}</StepsContent>
      <StepsAction>
        <div>
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <Button
              type="default"
              style={{ marginRight: '8px' }}
              onClick={() => prevStep()}
            >
              {t('Common.previous')}
            </Button>
          )}
        </div>
        <div>
          {currentStep < steps.length - 2 && (
            <Button type="accent" onClick={() => nextStep()}>
              {t('Common.next')}
            </Button>
          )}

          {currentStep === steps.length - 2 && (
            <Button
              type="accent"
              onClick={onFinish}
              loading={status === ACTION_STATUS.PENDING}
            >
              {t('Common.done')}
            </Button>
          )}
        </div>
      </StepsAction>
    </StyledRegisterTutor>
  );
});

export default RegisterTutor;
