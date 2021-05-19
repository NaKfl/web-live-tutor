import { lazyLoad } from 'utils/loadable';

export const BookingStudent = lazyLoad(
  () => import('./index'),
  module => module.BookingStudent,
);
