import { lazyLoad } from 'utils/loadable';

export const ExploreCourse = lazyLoad(
  () => import('./index'),
  module => module.ExploreCourse,
);
