import { useDepositAfterConfirm } from 'app/containers/ModalPayment/hooks';
import isEmpty from 'lodash/fp/isEmpty';
import querystring from 'querystring';
import { useEffect } from 'react';

const useHooks = props => {
  const returnPayment = querystring.parse(props?.location?.search);

  const {
    depositAfterConfirmStatus,
    depositAfterConfirm,
  } = useDepositAfterConfirm();

  useEffect(() => {
    if (!isEmpty(returnPayment)) {
      const price = returnPayment['?vnp_Amount'];
      depositAfterConfirm(price / 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handlers: {},
    selectors: { status: depositAfterConfirmStatus },
  };
};

export default useHooks;
