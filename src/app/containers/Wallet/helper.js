import moment from 'moment';
import { DATE_FORMAT } from 'utils/constants';

export const getIncomeOutCome = history => {
  if (!history || !history.length) {
    return { total: 0, income: 0, outcome: 0 };
  }
  return history.reduce(
    (acc, curr) => {
      const total = acc.total + +curr.price;
      if (curr.price < 0)
        return {
          ...acc,
          statistics: [
            ...acc.statistics,
            {
              total,
              income: 0,
              outcome: -curr.price,
              date: moment(curr.createdAt).format(DATE_FORMAT),
            },
          ],
          outcome: acc.outcome + +curr.price,
          total,
        };
      if (curr.price > 0)
        return {
          ...acc,
          statistics: [
            ...acc.statistics,
            {
              total,
              income: +curr.price,
              outcome: 0,
              date: moment(curr.createdAt).format(DATE_FORMAT),
            },
          ],
          income: acc.income + +curr.price,
          total,
        };
      return acc;
    },
    { total: 0, income: 0, outcome: 0, statistics: [] },
  );
};
