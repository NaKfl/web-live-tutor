import { Home } from 'app/containers/Home/Loadable';
import { Login } from 'app/containers/Login/Loadable';
import { Register } from 'app/containers/Register/Loadable';
import { Profile } from 'app/containers/Profile/Loadable';
import { RegisterTutor } from 'app/containers/RegisterTutor/Loadable';
import { JitsiMeetPage } from 'app/containers/JitsiMeetPage/Loadable';
import { ScheduleTutor } from 'app/containers/ScheduleTutor/Loadable';
import { CoursePage } from 'app/containers/CoursePage/Loadable';
import { DetailCourse } from 'app/containers/DetailCourse/Loadable';
import { History } from 'app/containers/History/Loadable';
import { SomethingWrongPage } from 'app/components/SomethingWrongPage/Loadable';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';

export const privateRoutes = [
  {
    path: '/profile',
    component: Profile,
    key: 'profile',
  },
  {
    path: '/',
    component: Home,
    key: 'home',
  },
  {
    path: '/register-tutor',
    component: RegisterTutor,
    key: 'register-tutor',
  },
  {
    path: '/schedule-tutor',
    component: ScheduleTutor,
    key: 'schedule-tutor',
  },
  {
    path: '/courses',
    component: CoursePage,
    key: 'coursePage',
  },
  {
    path: '/courses/:id',
    component: DetailCourse,
    key: 'detailCourse',
  },
  {
    path: '/history',
    component: History,
    key: 'history-call-session',
  },
];

export const publicRoutes = [
  {
    path: '/login',
    component: Login,
    key: 'login',
  },
  {
    path: '/register',
    component: Register,
    key: 'register',
  },
  {
    path: '/something-wrong',
    component: SomethingWrongPage,
    key: 'something-wrong',
  },
  {
    path: '/not-found',
    component: NotFoundPage,
    key: 'not-found',
  },
];

export const meetingRoutes = [
  {
    path: '/call',
    component: JitsiMeetPage,
    key: 'jitsi-meet-page',
  },
];
