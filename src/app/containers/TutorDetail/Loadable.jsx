import { lazyLoad } from 'utils/loadable';

export const TutorDetail = lazyLoad(
  () => import('./index'),
  module => module.TutorDetail,
);
