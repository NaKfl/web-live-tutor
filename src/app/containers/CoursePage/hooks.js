import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { useSelector } from 'react-redux';
import { selectCoursesList } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';

const useHooks = () => {
  const selectorCoursesList = useSelector(selectCoursesList);
  const { getCoursesList } = useActions(
    {
      getCoursesList: actions.getCoursesList,
    },
    [actions],
  );
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    getCoursesList();
  }, [getCoursesList]);

  useEffect(() => {
    if (
      selectorCoursesList &&
      selectorCoursesList.status === ACTION_STATUS.SUCCESS
    ) {
      setCoursesList(selectorCoursesList.data);
    } else {
      setCoursesList([]);
    }
  }, [selectorCoursesList]);

  return {
    handlers: {},
    selectors: { coursesList },
  };
};

export default useHooks;
