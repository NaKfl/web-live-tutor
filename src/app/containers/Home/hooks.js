import { useEffect, useCallback } from 'react';
import useActions from 'hooks/useActions';
import { actions } from './slice';
import { useSelector } from 'react-redux';
import {
  makeSelectListTutor,
  makeSelectListFavorite,
  makeSelectCount,
} from './selectors';
import { useHistory, useLocation } from 'react-router-dom';
// import { useQuery } from 'utils/common';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export const useHooks = () => {
  const listTutor = useSelector(makeSelectListTutor);
  const listFavorite = useSelector(makeSelectListFavorite);
  const countTotal = useSelector(makeSelectCount);
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page');

  const { fetchRequest, manageFavoriteTutor } = useActions(
    {
      fetchRequest: actions.fetchRequest,
      manageFavoriteTutor: actions.manageFavoriteTutor,
    },
    [actions],
  );

  useEffect(() => {
    if (page) {
      fetchRequest({ page });
    } else {
      fetchRequest();
    }
  }, [fetchRequest, page]);

  const onClickHeart = useCallback(
    data => {
      manageFavoriteTutor(data);
    },
    [manageFavoriteTutor],
  );

  const onSearch = useCallback(
    data => {
      fetchRequest({ search: data });
    },
    [fetchRequest],
  );

  const onChangePage = useCallback(
    page => {
      history.push(`/?page=${page}`);
    },
    [history],
  );

  return {
    selectors: {
      listTutor,
      listFavorite,
      pagination: {
        total: countTotal,
        pageSize: 20,
        current: page || 1,
        onChange: onChangePage,
      },
    },
    handlers: {
      onClickHeart,
      onSearch,
    },
  };
};

export const useForFavoriteList = () => {
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
