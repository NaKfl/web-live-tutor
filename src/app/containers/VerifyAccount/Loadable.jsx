import { lazyLoad } from 'utils/loadable';

export const VerifyAccount = lazyLoad(
  () => import('./index'),
  module => module.VerifyAccount,
);
