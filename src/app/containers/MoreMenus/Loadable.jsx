import { lazyLoad } from 'utils/loadable';

export const MoreMenus = lazyLoad(
  () => import('./index'),
  module => module.MoreMenus,
);
