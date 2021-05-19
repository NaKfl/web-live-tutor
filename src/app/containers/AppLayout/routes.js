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
import { TutorDetail } from 'app/containers/TutorDetail/Loadable';
import { SomethingWrongPage } from 'app/components/SomethingWrongPage/Loadable';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import { ForgotPassword } from 'app/containers/ForgotPassword/Loadable';
import { PermissionDeniedPage } from 'app/components/PermissionDeniedPage/Loadable';
import { ROLES } from 'utils/constants';

export const privateRoutes = [
  {
    path: '/profile',
    component: Profile,
    key: 'profile',
    requiredRoles: [ROLES.TUTOR, ROLES.STUDENT],
  },
  {
    path: '/',
    component: Home,
    key: 'home',
    requiredRoles: [ROLES.TUTOR, ROLES.STUDENT],
  },
  {
    path: '/register-tutor',
    component: RegisterTutor,
    key: 'register-tutor',
    requiredRoles: [ROLES.STUDENT, ROLES.TUTOR],
  },
  {
    path: '/schedule-tutor',
    component: ScheduleTutor,
    key: 'schedule-tutor',
    requiredRoles: [ROLES.TUTOR],
  },
  {
    path: '/courses',
    component: CoursePage,
    key: 'coursePage',
    requiredRoles: [ROLES.STUDENT],
  },
  {
    path: '/courses/:id',
    component: DetailCourse,
    key: 'detailCourse',
    requiredRoles: [ROLES.STUDENT],
  },
  {
    path: '/history',
    component: History,
    key: 'history-call-session',
    requiredRoles: [ROLES.TUTOR, ROLES.STUDENT],
  },
  {
    path: '/tutor/:tutorId',
    component: TutorDetail,
    key: 'tutor-detail',
    requiredRoles: [ROLES.TUTOR, ROLES.STUDENT],
  },
];

export const publicRoutes = [
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
  {
    path: '/permission-denied',
    component: PermissionDeniedPage,
    key: 'permission-denied',
  },
];

export const meetingRoutes = [
  {
    path: '/call',
    component: JitsiMeetPage,
    key: 'jitsi-meet-page',
  },
];

export const loginRoutes = [
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
    path: '/password',
    component: ForgotPassword,
    key: 'password',
  },
];
