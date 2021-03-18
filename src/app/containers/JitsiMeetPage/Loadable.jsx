import { lazyLoad } from 'utils/loadable';

export const JitsiMeetPage = lazyLoad(
  () => import('./index'),
  module => module.JitsiMeetPage,
);
