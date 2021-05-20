import { Result, Spin } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ACTION_STATUS } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledVerifyAccount } from './styles';

export const VerifyAccount = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { selectors } = useHooks();
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <StyledVerifyAccount>
      {status === ACTION_STATUS.SUCCESS && (
        <Result status="success" title={t('VerifyAccount.notifySuccess')} />
      )}
      {status === ACTION_STATUS.PENDING && <Spin size="large" />}
      {status === ACTION_STATUS.FAILED && (
        <Result status="warning" title={t('VerifyAccount.notifyFail')} />
      )}
    </StyledVerifyAccount>
  );
};

export default memo(VerifyAccount);
