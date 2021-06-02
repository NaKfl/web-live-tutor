import { Result, Spin } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ACTION_STATUS } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledVerifyDeposit } from './styles';

export const VerifyDeposit = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { selectors } = useHooks(props);
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <StyledVerifyDeposit>
      {status === ACTION_STATUS.SUCCESS && (
        <Result status="success" title={t('VerifyDeposit.notifySuccess')} />
      )}
      {status === ACTION_STATUS.PENDING && <Spin size="large" />}
      {status === ACTION_STATUS.FAILED && (
        <Result status="warning" title={t('VerifyDeposit.notifyFail')} />
      )}
      {!status && (
        <Result status="error" title={t('VerifyDeposit.notifyError')} />
      )}
    </StyledVerifyDeposit>
  );
};

export default memo(VerifyDeposit);
