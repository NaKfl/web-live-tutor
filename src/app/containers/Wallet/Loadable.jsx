import { lazyLoad } from 'utils/loadable';

export const Wallet = lazyLoad(
  () => import('./index'),
  module => module.Wallet,
);
