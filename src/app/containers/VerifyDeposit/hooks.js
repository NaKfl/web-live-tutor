import { useDepositAfterConfirm } from 'app/containers/ModalPayment/hooks';
import { useEffect } from 'react';
import { getTransactionToken } from 'utils/localStorageUtils';
import querystring from 'querystring';
import isEmpty from 'lodash/fp/isEmpty';

const useHooks = props => {
  const query = querystring.parse(props?.location?.search);
  const error = !isEmpty(query) && query['?error'];

  const {
    depositAfterConfirmStatus,
    depositAfterConfirm,
  } = useDepositAfterConfirm();

  useEffect(() => {
    const transactionToken = getTransactionToken();
    if (!error && transactionToken) {
      depositAfterConfirm(transactionToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handlers: {},
    selectors: { status: depositAfterConfirmStatus, error },
  };
};

export default useHooks;
