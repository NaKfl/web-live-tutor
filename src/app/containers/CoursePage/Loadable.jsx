import { lazyLoad } from 'utils/loadable';

export const CoursePage = lazyLoad(
  () => import('./index'),
  module => module.CoursePage,
);
