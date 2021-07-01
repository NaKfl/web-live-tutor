import { notification } from 'antd';
import i18n from 'locales/i18n';

export const notifyError = (
  message = i18n.t('Common.notifyFail'),
  description = '',
) => {
  notification.error({
    message: message,
    description,
    placement: 'topRight',
    top: 90,
  });
};

export const notifySuccess = (
  message = i18n.t('Common.notifySuccess'),
  description = '',
) => {
  notification.success({
    message: message,
    description,
    placement: 'topRight',
    top: 90,
  });
};
