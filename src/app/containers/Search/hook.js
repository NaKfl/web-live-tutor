import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import {
  makeListTutorFilter,
  makePageCurrent,
  makeSelectedOption,
  makeSelectedShowHideDropDown,
  makeTotalCount,
} from './selector';
import { actions } from './slice';
import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { debounce } from 'lodash';

export const useHook = () => {
  const show = useSelector(makeSelectedShowHideDropDown);
  const option = useSelector(makeSelectedOption);
  const location = useLocation();
  const history = useHistory();

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
    });
    if (!!option) optionFromUrl({ ...urlParse });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    getFilter();
    return () => {
      resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFilter = debounce(options => {
    const a = qs.stringify(options, {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: '|',
      skipNull: true,
    });
    history.push({
      search: a,
    });
  }, 600);

  return {
    selectors: {
      showHideDropDownState: show,
      option,
      searchValue: option?.search,
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
