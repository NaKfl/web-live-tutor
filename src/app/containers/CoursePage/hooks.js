import useActions from 'hooks/useActions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import { selectCoursesList } from './selectors';
import { actions } from './slice';

const useHooks = () => {
  const selectorCoursesList = useSelector(selectCoursesList);
  const history = useHistory();
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

  const onSelectCard = id => {
    history.push(`/courses/${id}`);
  };

  return {
    handlers: { onSelectCard },
    selectors: { coursesList },
  };
};

export default useHooks;
