import { notification } from 'antd';
import i18n from 'locales/i18n';

export const notifyError = message => {
  notification.error({
    message: message || i18n.t('Common.notifyFail'),
    placement: 'topRight',
    top: 90,
  });
};

export const notifySuccess = message => {
  notification.success({
    message: message || i18n.t('Common.notifyFail'),
    placement: 'topRight',
    top: 90,
  });
};
