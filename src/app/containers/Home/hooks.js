import { useState, useEffect } from 'react';
import useActions from 'hooks/useActions';
import { actions } from './slice';
import { useSelector } from 'react-redux';
import { makeSelectListTutor } from './selectors';
export const useHooks = () => {
  const listTutor = useSelector(makeSelectListTutor);
  const { fetchRequest } = useActions({ fetchRequest: actions.fetchRequest }, [
    actions,
  ]);
  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);
  return {
    selectors: {
      listTutor,
    },
  };
};
