import moment from 'moment';
import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectProfileInfo,
  selectEditProfileStatus,
  selectVisibleModal,
  selectLoadingUpload,
  selectGetStatus,
} from './selectors';
import { actions } from './slice';
import Form from 'app/components/Form';
import { ACTION_STATUS } from 'utils/constants';
import { DATE_FORMAT } from 'utils/constants';

const useHooks = () => {
  const [form] = Form.useForm();
  const info = useSelector(selectProfileInfo);
  const statusUpdate = useSelector(selectEditProfileStatus);
  const avatarUploadVisible = useSelector(selectVisibleModal);
  const loadingUpload = useSelector(selectLoadingUpload);
  const getStatus = useSelector(selectGetStatus);

  const {
    getProfile,
    editProfile,
    uploadAvatar,
    hideModal,
    showModal,
  } = useActions(
    {
      getProfile: actions.getProfile,
      editProfile: actions.editProfile,
      uploadAvatar: actions.uploadAvatar,
      hideModal: actions.hideModal,
      showModal: actions.showModal,
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
      editProfile({
        ...values,
        birthday: values?.birthday
          ? moment(values?.birthday).format(DATE_FORMAT)
          : null,
      });
    },
    [editProfile],
  );
  const openModal = useCallback(() => {
    showModal();
  }, [showModal]);
  const modalControl = {
    handleOk: useCallback(
      image => {
        uploadAvatar(image);
      },
      [uploadAvatar],
    ),
    handleCancel: useCallback(() => {
      hideModal();
    }, [hideModal]),
  };
  return {
    handlers: { onFinish, openModal, modalControl },
    selectors: {
      loading: statusUpdate === ACTION_STATUS.PENDING,
      info: processedInfo,
      form,
      avatarUploadVisible,
      loadingUpload,
      getStatus,
    },
  };
};

export default useHooks;
