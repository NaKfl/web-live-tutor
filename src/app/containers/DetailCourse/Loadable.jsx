import { lazyLoad } from 'utils/loadable';

export const DetailCourse = lazyLoad(
  () => import('./index'),
  module => module.DetailCourse,
);
