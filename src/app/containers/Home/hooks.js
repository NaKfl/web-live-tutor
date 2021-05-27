import { useEffect, useCallback, useState } from 'react';
import useActions from 'hooks/useActions';
import { actions } from './slice';
import { useSelector } from 'react-redux';
import {
  makeSelectListTutor,
  makeSelectListFavorite,
  makeSelectCount,
  selectTopTutorData,
  selectTopTutorStatus,
  makeSelectStatus,
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
  const topTutorStatus = useSelector(selectTopTutorStatus);
  const moreTutorsStatus = useSelector(makeSelectStatus);
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
      topTutorStatus,
      moreTutorsStatus,
      pagination: {
        total: countTotal,
        pageSize: 9,
        current: parseInt(page) || 1,
        onChange: onChangePage,
      },
    },
    handlers: {
      onClickHeart,
    },
  };
};

export const useListTutor = () => {
  const listFavorite = useSelector(makeSelectListFavorite);

  const { manageFavoriteTutor } = useActions(
    {
      manageFavoriteTutor: actions.manageFavoriteTutor,
    },
    [actions],
  );

  const onClickHeart = useCallback(
    data => {
      manageFavoriteTutor(data);
    },
    [manageFavoriteTutor],
  );

  return {
    onClickHeart,
    listFavorite,
  };
};

export const useForFavoriteList = () => {
  const listFavorite = useSelector(makeSelectListFavorite);

  return {
    selectors: { listFavorite },
  };
};
