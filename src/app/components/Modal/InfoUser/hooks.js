import useActions from 'hooks/useActions';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectInfoUserData } from './selectors';
import { actions } from './slice';

export const useHooks = props => {
  const { user } = props;
  const [isSelectDate, setIsSelectDate] = useState(false);
  const onSelectDate = useCallback(value => {
    setIsSelectDate(true);
  }, []);
  const handleBackSelectDate = useCallback(() => {
    setIsSelectDate(false);
  }, []);

  return {
    handlers: { onSelectDate, handleBackSelectDate },
    selectors: { isSelectDate },
  };
};

export default useHooks;
