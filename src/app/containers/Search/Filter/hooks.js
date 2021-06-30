import useActions from 'hooks/useActions';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  makeFilter,
  makeSelectedOption,
  makeSelectedShowHideDropDown,
} from '../selector';
import { actions } from '../slice';
import get from 'lodash/fp/get';

export const useHooks = () => {
  const isChoosing = useRef(null);
  const [chosenFilters, setChosenFilters] = useState({});
  const filter = useSelector(makeFilter);
  const option = useSelector(makeSelectedOption);
  const showHideDropDownState = useSelector(makeSelectedShowHideDropDown);
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

  const onSelectFilter = useCallback((category, tag) => {
    setChosenFilters({ category, tag });
  }, []);

  useEffect(() => {
    if (isChoosing.current) clearTimeout(isChoosing.current);
    isChoosing.current = setTimeout(() => {
      onChangeFilter(chosenFilters);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenFilters]);

  return {
    selectors: {
      showHideDropDownState:
        showHideDropDownState ||
        filter.some(type => option[type?.title]?.length > 0),
      filterViewData,
    },
    handlers: { onChangeFilter: onSelectFilter, getOptionDefault },
  };
};
