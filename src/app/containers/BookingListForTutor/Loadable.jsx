import { lazyLoad } from 'utils/loadable';

export const BookingListForTutor = lazyLoad(
  () => import('./index'),
  module => module.BookingListForTutor,
);
