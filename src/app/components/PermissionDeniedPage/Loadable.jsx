import { lazyLoad } from 'utils/loadable';

export const PermissionDeniedPage = lazyLoad(
  () => import('./index'),
  module => module.PermissionDeniedPage,
);
