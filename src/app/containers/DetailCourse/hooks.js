import useActions from 'hooks/useActions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import { selectDetailCourse } from './selectors';
import { actions } from './slice';

const useHooks = () => {
  const { id: courseId } = useParams();
  const selectorDetailCourse = useSelector(selectDetailCourse);
  const { getDetailCourse } = useActions(
    {
      getDetailCourse: actions.getDetailCourse,
    },
    [actions],
  );
  const [detailCourse, setDetailCourse] = useState({});

  useEffect(() => {
    getDetailCourse(courseId);
  }, [courseId, getDetailCourse]);

  useEffect(() => {
    if (
      selectorDetailCourse &&
      selectorDetailCourse.status === ACTION_STATUS.SUCCESS
    ) {
      setDetailCourse(selectorDetailCourse.data);
    } else {
      setDetailCourse({});
    }
  }, [selectorDetailCourse]);

  return {
    handlers: {},
    selectors: { detailCourse },
  };
};

export default useHooks;
