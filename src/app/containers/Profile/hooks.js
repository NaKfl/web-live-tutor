import Form from 'app/components/Form';
import useActions from 'hooks/useActions';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ACTION_STATUS, DATE_FORMAT } from 'utils/constants';
import { notifySuccess } from 'utils/notify';
import {
  selectEditProfileStatus,
  selectGetStatus,
  selectLoadingUpload,
  selectProfileInfo,
  selectVisibleModal,
  selectGetTutorInfoStatus,
  selectGetTutorInfoData,
  selectEditTutorInfoStatus,
} from './selectors';
import { actions } from './slice';
import { useTranslation } from 'react-i18next';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

const useHooks = () => {
  const [form] = Form.useForm();
  const info = useSelector(selectProfileInfo);
  const statusUpdate = useSelector(selectEditProfileStatus);
  const avatarUploadVisible = useSelector(selectVisibleModal);
  const loadingUpload = useSelector(selectLoadingUpload);
  const getStatus = useSelector(selectGetStatus);
  const currentRole = getUserFromStorage()?.currentRole;

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
      currentRole,
    },
  };
};

export const useTutorInfo = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [video, setVideo] = useState();

  const info = useSelector(selectProfileInfo);
  const tutor = useSelector(selectGetTutorInfoData);
  const getTutorInfoStatus = useSelector(selectGetTutorInfoStatus);
  const editTutorInfoStatus = useSelector(selectEditTutorInfoStatus);

  const formattedTutor = {
    ...tutor,
    specialties: tutor?.specialties?.split(','),
    languages: tutor?.languages?.split(','),
  };

  const { getTutorInfo, editTutorInfo } = useActions(
    {
      getTutorInfo: actions.getTutorInfo,
      editTutorInfo: actions.editTutorInfo,
    },
    [actions],
  );

  useEffect(() => {
    if (info?.id) getTutorInfo(info.id);
  }, [getTutorInfo, info?.id]);

  useEffect(() => form.resetFields(), [tutor, form]);

  const selectVideo = useCallback(file => setVideo(file), []);

  const onFinish = useCallback(async () => {
    try {
      let isChanged = false;
      await form.validateFields();
      const values = form.getFieldsValue();
      const formattedValues = {
        ...values,
        specialties: values?.specialties?.join(','),
        languages: values?.languages?.join(','),
      };
      const formData = new FormData();
      for (const [key, value] of Object.entries(formattedValues)) {
        if (tutor[key] !== value) {
          formData.append(key, value);
          isChanged = true;
        }
      }
      if (video && video !== tutor.video) {
        formData.append('video', video);
        isChanged = true;
      }
      console.log('isChanged', isChanged);
      console.log('data', ...formData);
      if (isChanged) editTutorInfo(formData);
      else {
        notifySuccess(t('Profile.nothingChanged'));
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [editTutorInfo, form, t, tutor, video]);

  return {
    handlers: { selectVideo, onFinish },
    selectors: {
      loading: getTutorInfoStatus === ACTION_STATUS.PENDING,
      loadingEdit: editTutorInfoStatus === ACTION_STATUS.PENDING,
      tutor: formattedTutor,
      form,
    },
  };
};

export default useHooks;
