import useActions from 'hooks/useActions';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    getDetailCourse(courseId);
  }, [courseId, getDetailCourse]);

  const handleChangeTopic = useCallback(fileName => {
    setFileName(fileName);
  }, []);

  return {
    handlers: { handleChangeTopic },
    selectors: { detailCourse: selectorDetailCourse.data, fileName },
  };
};

export default useHooks;
