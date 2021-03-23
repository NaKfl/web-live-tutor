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
import { notifyError } from 'utils/notify';

export const useHooks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorFormValues, setTutorFormValues] = useState({});
  const [avatar, setAvatar] = useState();
  const [video, setVideo] = useState();
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
  //upload avatar
  const selectAvatar = useCallback(file => setAvatar(file), []);
  const selectVideo = useCallback(file => setVideo(file), []);

  const onFinish = useCallback(() => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(tutorFormValues)) {
      formData.append(key, value);
    }
    formData.append('video', video);
    registerTutor(formData);
  }, [registerTutor, tutorFormValues, video]);

  const onFinishFailed = useCallback(errorInfo => {
    console.log('Failed: ', errorInfo);
  }, []);

  const nextStep = useCallback(async () => {
    try {
      if (!avatar) {
        notifyError('Please upload your avatar');
        throw new Error('Please upload your avatar');
      }
      await formProfile.validateFields();
      const values = formProfile.getFieldsValue();
      setTutorFormValues({
        ...values,
        birthday: values?.birthday
          ? moment(values?.birthday).format(DATE_FORMAT)
          : null,
        languages: values?.languages?.split(', '),
        avatar,
      });
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [currentStep, formProfile, avatar]);

  const prevStep = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  return {
    handlers: {
      onFinish,
      onFinishFailed,
      nextStep,
      prevStep,
      selectAvatar,
      selectVideo,
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