import { useEffect, useCallback } from 'react';
import useActions from 'hooks/useActions';
import { actions } from './slice';
import { useSelector } from 'react-redux';
import { makeSelectListTutor, makeSelectListFavorite } from './selectors';
export const useHooks = () => {
  const listTutor = useSelector(makeSelectListTutor);
  const listFavorite = useSelector(makeSelectListFavorite);

  const { fetchRequest, manageFavoriteTutor } = useActions(
    {
      fetchRequest: actions.fetchRequest,
      manageFavoriteTutor: actions.manageFavoriteTutor,
    },
    [actions],
  );
  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  const onClickHeart = useCallback(
    data => {
      manageFavoriteTutor(data);
    },
    [manageFavoriteTutor],
  );

  return {
    selectors: {
      listTutor,
      listFavorite,
    },
    handlers: {
      onClickHeart,
    },
  };
};

export const useForFavortiteList = () => {
  const listFavorite = useSelector(makeSelectListFavorite);
  const { fetchFavoriteList } = useActions(
    {
      fetchFavoriteList: actions.fetchFavoriteList,
    },
    [actions],
  );

  const showFavoriteTutorList = useCallback(() => {
    fetchFavoriteList();
  }, [fetchFavoriteList]);

  return {
    handlers: { showFavoriteTutorList },
    selectors: { listFavorite },
  };
};
