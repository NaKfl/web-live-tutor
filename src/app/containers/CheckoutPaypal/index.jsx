import isEmpty from 'lodash/fp/isEmpty';
import querystring from 'querystring';
import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import { StyledCheckoutPaypal } from './styles';

const PayPalButton = window.paypal.Buttons.driver('react', {
  React,
  ReactDOM,
});

export const CheckoutPaypal = props => {
  const returnPayment = querystring.parse(props?.location?.search);
  const price = !isEmpty(returnPayment) ? returnPayment['?amount'] : 0;

  const _createOrder = (_, actions) => {
    if (price)
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: price,
            },
          },
        ],
      });
  };

  const _onApprove = async (_, actions) => {
    let order = await actions.order.capture();
    window.ReactNativeWebView?.postMessage(JSON.stringify(order));
  };

  function _onError(err) {
    window.ReactNativeWebView?.postMessage(JSON.stringify(err));
  }

  return (
    <StyledCheckoutPaypal>
      <PayPalButton
        createOrder={(data, actions) => _createOrder(data, actions)}
        onApprove={(data, actions) => _onApprove(data, actions)}
        onError={(data, actions) => _onError(data, actions)}
        onCancel={() => _onError('Canceled')}
      />
    </StyledCheckoutPaypal>
  );
};

export default memo(CheckoutPaypal);
