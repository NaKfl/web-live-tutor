import { lazyLoad } from 'utils/loadable';

export const SomethingWrongPage = lazyLoad(
  () => import('./index'),
  module => module.SomethingWrongPage,
);
