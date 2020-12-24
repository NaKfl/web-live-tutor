import moment from 'moment';
import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProfileInfo, selectEditProfileStatus } from './selectors';
import { actions } from './slice';
import Form from 'app/components/Form';
import { ACTION_STATUS } from 'utils/constants';
import { DATE_FORMAT } from 'utils/constants';

const useHooks = () => {
  const [form] = Form.useForm();
  const info = useSelector(selectProfileInfo);
  const statusUpdate = useSelector(selectEditProfileStatus);
  const { getProfile, editProfile } = useActions(
    {
      getProfile: actions.getProfile,
      editProfile: actions.editProfile,
    },
    [actions],
  );

  const processedInfo = {
    ...info,
    birthday: info?.birthday ? moment(info?.birthday) : undefined,
  };

  useEffect(() => getProfile(), [getProfile]);

  useEffect(() => form.resetFields(), [info, form]);

  const onFinish = useCallback(
    values => {
      console.log('values', values.birthday);
      editProfile({
        ...values,
        birthday: values?.birthday
          ? moment(values?.birthday).format(DATE_FORMAT)
          : null,
      });
    },
    [editProfile],
  );

  return {
    handlers: { onFinish },
    selectors: {
      loading: statusUpdate === ACTION_STATUS.PENDING,
      info: processedInfo,
      form,
    },
  };
};

export default useHooks;
