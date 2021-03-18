import useActions from 'hooks/useActions';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectInfoUserData } from './selectors';
import { actions } from './slice';

export const useHooks = props => {
  const [isSelectDate, setIsSelectDate] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const onSelectDate = useCallback(value => {
    setIsSelectDate(true);
  }, []);

  const handleBackSelectDate = useCallback(() => {
    setIsSelectDate(false);
  }, []);

  const toggleMessage = useCallback(() => {
    setIsShowMessage(prevState => !prevState);
  }, []);

  return {
    handlers: { onSelectDate, handleBackSelectDate, toggleMessage },
    selectors: { isSelectDate, isShowMessage },
  };
};

export default useHooks;
