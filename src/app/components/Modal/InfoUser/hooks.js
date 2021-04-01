import useActions from 'hooks/useActions';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectScheduleTutor } from 'app/containers/ScheduleTutor/selectors';
import { actions } from 'app/containers/ScheduleTutor/slice';
import { ACTION_STATUS } from 'utils/constants';

export const useHooks = props => {
  const selectorScheduleTutor = useSelector(selectScheduleTutor);
  const { getFreeSchedule } = useActions(
    {
      getFreeSchedule: actions.getFreeSchedule,
    },
    [actions],
  );

  const [scheduleDatesTutor, setScheduleDatesTutor] = useState([]);
  const [dateSelected, setDateSelected] = useState('');
  const [isSelectDate, setIsSelectDate] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  useEffect(() => {
    getFreeSchedule();
  }, [getFreeSchedule]);

  useEffect(() => {
    if (
      selectorScheduleTutor &&
      selectorScheduleTutor.status === ACTION_STATUS.SUCCESS
    ) {
      setScheduleDatesTutor(selectorScheduleTutor.data);
    } else {
      setScheduleDatesTutor([]);
    }
  }, [selectorScheduleTutor]);

  const onSelectDate = useCallback(value => {
    setDateSelected(value);
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
    selectors: {
      isSelectDate,
      isShowMessage,
      scheduleDatesTutor,
      dateSelected,
    },
  };
};

export default useHooks;
