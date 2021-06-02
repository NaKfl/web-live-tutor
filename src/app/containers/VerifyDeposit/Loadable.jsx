import { lazyLoad } from 'utils/loadable';

export const VerifyDeposit = lazyLoad(
  () => import('./index'),
  module => module.VerifyDeposit,
);
