import { notification } from 'antd';
import i18n from 'locales/i18n';

export const notifyError = (message, ...rest) => {
  notification.error({
    message: message || i18n.t('Common.notifyFail'),
    placement: 'topRight',
    top: 90,
    ...rest,
  });
};

export const notifySuccess = (message, ...rest) => {
  notification.success({
    message: message || i18n.t('Common.notifyFail'),
    placement: 'topRight',
    top: 90,
    ...rest,
  });
};
