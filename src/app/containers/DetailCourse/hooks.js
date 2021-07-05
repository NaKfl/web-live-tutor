import useActions from 'hooks/useActions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import {
  selectDetailCourse,
  selectTutorAddCourse,
  selectTutorRemoveCourse,
} from './selectors';
import { actions } from './slice';

const useHooks = () => {
  const { id: courseId } = useParams();
  const selectorDetailCourse = useSelector(selectDetailCourse);
  const selectorTutorAddCourse = useSelector(selectTutorAddCourse);
  const selectorTutorRemoveCourse = useSelector(selectTutorRemoveCourse);
  const { getDetailCourse, tutorAddCourse, tutorRemoveCourse } = useActions(
    {
      getDetailCourse: actions.getDetailCourse,
      tutorAddCourse: actions.tutorAddCourse,
      tutorRemoveCourse: actions.tutorRemoveCourse,
    },
    [actions],
  );
  const [detailCourse, setDetailCourse] = useState({});

  useEffect(() => {
    getDetailCourse(courseId);
  }, [
    courseId,
    getDetailCourse,
    selectorTutorAddCourse.data,
    selectorTutorRemoveCourse.data,
  ]);

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
    handlers: { tutorAddCourse, tutorRemoveCourse },
    selectors: {
      detailCourse,
      loading:
        detailCourse.status === ACTION_STATUS.PENDING ||
        selectorTutorAddCourse.status === ACTION_STATUS.PENDING ||
        selectorTutorRemoveCourse.status === ACTION_STATUS.PENDING,
    },
  };
};

export default useHooks;
