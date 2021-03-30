import { lazyLoad } from 'utils/loadable';

export const ScheduleTutor = lazyLoad(
  () => import('./index'),
  module => module.ScheduleTutor,
);
