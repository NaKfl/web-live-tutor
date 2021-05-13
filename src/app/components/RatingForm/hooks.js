import { useState, useEffect } from 'react';
import useActions from 'hooks/useActions';
import { actions } from 'app/containers/Home/slice';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { getTutorById } from 'fetchers/tutor.service';
import { notifyError, notifySuccess } from 'utils/notify';

export const useHooks = props => {
  const [contentReview, setContentReview] = useState('');
  const [rating, setRating] = useState(0);
  const { tutor } = props;
  const { sessionId } = tutor;
  const [tutorInfo, setTutorInfo] = useState({});
  const { reviewTutor } = useActions(
    {
      reviewTutor: actions.reviewTutor,
    },
    [actions],
  );

  const fetchTutorById = tutorId => {
    getTutorById({ tutorId }).then(data => {
      setTutorInfo(data);
    });
  };

  useEffect(() => {
    fetchTutorById(tutor.userId);
  }, [tutor.userId]);

  const handleChangeContent = ({ target: { value } }) => {
    setContentReview(value);
  };

  const handleChangeRating = value => {
    setRating(value);
  };
  const handleSubmitReview = ({ tutor }) => {
    if (contentReview && rating) {
      console.log('2222222222', sessionId);
      reviewTutor({
        sessionId,
        tutorId: tutor.userId,
        rating,
        content: contentReview,
      });
      notifySuccess('Submit successfully');
      props.onCancel();
    } else {
      notifyError('Please fill content & rating');
    }
  };
  return {
    handlers: { handleSubmitReview, handleChangeContent, handleChangeRating },
    selectors: { tutorInfo },
  };
};

export default useHooks;
