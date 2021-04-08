import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDetailCourse } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
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
    console.log('courseIdddddddddd', courseId);
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
