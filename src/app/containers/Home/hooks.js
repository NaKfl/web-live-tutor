import { useEffect, useCallback, useState } from 'react';
import useActions from 'hooks/useActions';
import { actions } from './slice';
import { useSelector } from 'react-redux';
import {
  makeSelectListTutor,
  makeSelectListFavorite,
  makeSelectCount,
  selectTopTutorData,
} from './selectors';
import { useHistory, useLocation } from 'react-router-dom';
import socket from 'utils/socket';
import { getUser } from 'utils/localStorageUtils';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export const useHooks = () => {
  const user = getUser();
  const listTutor = useSelector(makeSelectListTutor);
  const listFavorite = useSelector(makeSelectListFavorite);
  const countTotal = useSelector(makeSelectCount);
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page');
  const topTutor = useSelector(selectTopTutorData);
  const [onlineTutors, setOnlineTutors] = useState([]);

  const { fetchRequest, manageFavoriteTutor, getTopTutor } = useActions(
    {
      fetchRequest: actions.fetchRequest,
      manageFavoriteTutor: actions.manageFavoriteTutor,
      getTopTutor: actions.getTopTutor,
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

  useEffect(() => {
    getTopTutor();
  }, [getTopTutor]);

  useEffect(() => {
    socket.emit('onlineTutors:getList');
  }, []);

  useEffect(() => {
    socket.on('onlineTutors:returnList', ({ listTutor }) => {
      const excludeMeListTutor = listTutor.filter(
        item => item?.userId !== user?.id,
      );
      setOnlineTutors(excludeMeListTutor);
    });
  }, [user?.id]);

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
      onlineTutors,
      listTutor,
      listFavorite,
      topTutor,
      pagination: {
        total: countTotal,
        pageSize: 9,
        current: parseInt(page) || 1,
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
