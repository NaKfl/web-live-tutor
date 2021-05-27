import React, { memo } from 'react';
import { useInjectReducer } from 'utils/reduxInjectors';
import { reducer, sliceKey } from './slice';
import useHooks from './hooks';

import Confirm from 'app/components/Modal/Confirm';
import InfoUser from 'app/components/Modal/InfoUser';
import CallModal from 'app/components/CallModal';
import RatingForm from 'app/components/RatingForm';
import ScheduleModal from 'app/components/ScheduleModal';
import ModalPayment from 'app/containers/ModalPayment';
import ModalTransaction from 'app/containers/ModalTransaction';

import { POPUP_TYPE } from './constants';

export const Popup = memo(() => {
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { handleClosePopup } = handlers;
  const { popups } = selectors;

  return (
    <>
      {popups.map(popup => {
        switch (popup.type) {
          case POPUP_TYPE.CONFIRM: {
            return (
              <Confirm
                key={popup.key}
                onCancel={handleClosePopup(popup)}
                visible
                {...popup}
              />
            );
          }

          case POPUP_TYPE.INFO_TUTOR: {
            return (
              <InfoUser
                key={popup.key}
                onCancel={handleClosePopup(popup)}
                visible
                {...popup}
              />
            );
          }

          case POPUP_TYPE.CALL_VIDEO: {
            return (
              <CallModal
                key={popup.key}
                onCancel={handleClosePopup(popup)}
                visible
                {...popup}
              />
            );
          }

          case POPUP_TYPE.SCHEDULE_REGISTER: {
            return (
              <ScheduleModal
                key={popup.key}
                onCancel={handleClosePopup(popup)}
                visible
                {...popup}
              />
            );
          }

          case POPUP_TYPE.RATING_MODAL: {
            return (
              <RatingForm
                key={popup.key}
                onCancel={handleClosePopup(popup)}
                visible
                {...popup}
              />
            );
          }

          case POPUP_TYPE.PAYMENT_MODAL: {
            return (
              <ModalPayment
                key={popup.key}
                onCancel={handleClosePopup(popup)}
                visible
                {...popup}
              />
            );
          }

          case POPUP_TYPE.TRANSACTION_MODAL: {
            return (
              <ModalTransaction
                key={popup.key}
                onCancel={handleClosePopup(popup)}
                visible
                {...popup}
              />
            );
          }

          default: {
            return null;
          }
        }
      })}
    </>
  );
});

export default Popup;
