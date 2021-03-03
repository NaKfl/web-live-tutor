import { lazyLoad } from 'utils/loadable';

export const RegisterTutor = lazyLoad(
  () => import('./index'),
  module => module.RegisterTutor,
);
