import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import {
  makeListTutorFilter,
  makeLoading,
  makePageCurrent,
  makeSelectedOption,
  makeSelectedShowHideDropDown,
  makeTotalCount,
} from './selector';
import { actions } from './slice';
import qs from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { debounce } from 'lodash';
import { useGetMajor } from '../Home/hooks';
import { useMemo } from 'react';

export const useHook = () => {
  const show = useSelector(makeSelectedShowHideDropDown);
  const option = useSelector(makeSelectedOption);
  const location = useLocation();
  const loading = useSelector(makeLoading);
  const history = useHistory();
  useGetMajor();
  const {
    showHideDropDown,
    hideDropDown,
    optionFromUrl,
    resetState,
    getFilter,
  } = useActions(
    {
      getFilter: actions.getFilter,
      showHideDropDown: actions.showHideDropDown,
      hideDropDown: actions.hideDropDown,
      optionFromUrl: actions.optionFromUrl,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    const urlParse = qs.parse(location.search, {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: '|',
      skipNull: true,
      encode: true,
    });
    debounceSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce(urlParse => {
      if (!!option) optionFromUrl({ ...urlParse });
    }, 200),
    [],
  );
  useEffect(() => {
    getFilter();
    return () => {
      resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFilter = useCallback(options => {
    debouncedSave(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSave = useCallback(nextValue => {
    const a = qs.stringify(nextValue, {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: '|',
      skipNull: true,
      encode: true,
    });
    history.push({
      search: a,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = useMemo(() => {
    return option;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    selectors: {
      showHideDropDownState: show,
      option: options,
      searchValue: option.search,
      loading,
    },
    handlers: {
      showHideDropDown,
      hideDropDown,
      onChangeFilter,
    },
  };
};

export const useListTutorSearch = () => {
  const listTutor = useSelector(makeListTutorFilter);

  return {
    listTutor,
  };
};

export const usePagination = () => {
  const totalCount = useSelector(makeTotalCount);
  const current = useSelector(makePageCurrent);
  const option = useSelector(makeSelectedOption);
  const history = useHistory();

  const [callHistoryPush, setHistoryPush] = useState(false);

  const { changePage } = useActions(
    {
      changePage: actions.changePage,
    },
    [actions],
  );

  useEffect(() => {
    if (callHistoryPush) {
      const a = qs.stringify(option, {
        arrayFormat: 'bracket-separator',
        arrayFormatSeparator: '|',
        skipNull: true,
      });
      history.push({
        search: a,
      });
      setHistoryPush(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callHistoryPush, history]);

  const onChange = page => {
    changePage(parseInt(page));
    setHistoryPush(true);
  };

  return {
    total: totalCount,
    current: parseInt(current),
    onChange,
  };
};

export default useHook;
