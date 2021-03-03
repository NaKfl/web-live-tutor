import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { useHistory } from 'react-router-dom';
import { makeSelectRegisterTutorStatus } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import Form from 'app/components/Form';
import moment from 'moment';
import { DATE_FORMAT } from 'utils/constants';

export const useHooks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorFormValues, setTutorFormValues] = useState({});
  const [formProfile] = Form.useForm();
  const history = useHistory();
  const { registerTutor } = useActions(
    { registerTutor: actions.registerTutor },
    [actions],
  );
  const status = useSelector(makeSelectRegisterTutorStatus);

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      history.push('/login');
    }
  }, [status, history]);

  const onFinish = useCallback(() => {
    // const { avatar, name, country } = tutorFormValues;
    // const submittedData = {
    //   avatar,
    //   name,
    //   country,
    // };

    console.log('tutorFormValues', tutorFormValues);
    registerTutor(tutorFormValues);
  }, [registerTutor, tutorFormValues]);

  const onFinishFailed = useCallback(errorInfo => {
    console.log('Failed: ', errorInfo);
  }, []);

  const nextStep = useCallback(async () => {
    try {
      await formProfile.validateFields();
      const values = formProfile.getFieldsValue();
      setTutorFormValues({
        ...values,
        birthday: values?.birthday
          ? moment(values?.birthday).format(DATE_FORMAT)
          : null,
        languages: values?.languages?.split(', '),
      });
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [currentStep, formProfile]);

  const prevStep = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  return {
    handlers: {
      onFinish,
      onFinishFailed,
      nextStep,
      prevStep,
    },
    selectors: { status, currentStep, tutorFormValues, formProfile },
  };
};

export const useUnmount = () => {
  const { resetState } = useActions({ resetState: actions.resetState }, [
    actions,
  ]);
  useEffect(() => () => resetState(), [resetState]);
};

export default useHooks;
