import useActions from 'hooks/useActions';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  makeFilter,
  makeSelectedOption,
  makeSelectedShowHideDropDown,
} from '../selector';
import { actions } from '../slice';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import get from 'lodash/fp/get';

export const useHooks = () => {
  const filter = useSelector(makeFilter);
  const option = useSelector(makeSelectedOption);
  const showHideDropDownState = useSelector(makeSelectedShowHideDropDown);
  const history = useHistory();
  const filterViewData = useMemo(() => {
    if (filter?.length === 0) {
      return [];
    }
    return filter;
  }, [filter]);

  const { onChangeFilter } = useActions(
    {
      onChangeFilter: actions.onChangeFilter,
    },
    [actions],
  );

  const getOptionDefault = useCallback(
    type => {
      return get(`${type}`, option);
    },
    [option],
  );

  const onSelectFilter = useCallback(
    (category, tag) => {
      onChangeFilter({ category, tag });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChangeFilter, option],
  );

  useEffect(() => {
    const directTo = qs.stringify(option, {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: '|',
      skipNull: true,
    });
    history.push({
      search: directTo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  return {
    selectors: {
      showHideDropDownState,
      filterViewData,
    },
    handlers: { onChangeFilter: onSelectFilter, getOptionDefault },
  };
};
