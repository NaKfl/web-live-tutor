import { ROLES } from 'utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChalkboardTeacher,
  faGraduationCap,
  faCalendarCheck,
  faCalendarWeek,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';

export const MenuBarListItems = [
  {
    id: '1',
    icon: props => <FontAwesomeIcon icon={faChalkboardTeacher} {...props} />,
    title: 'Category.tutor',
    path: '/',
    requiredRoles: [ROLES.STUDENT],
  },
  {
    id: '2',
    icon: props => <FontAwesomeIcon icon={faCalendarWeek} {...props} />,
    title: 'Category.schedule',
    path: '/schedule-tutor',
    requiredRoles: [ROLES.TUTOR],
  },
  {
    id: '3',
    icon: props => <FontAwesomeIcon icon={faCalendarCheck} {...props} />,
    title: 'Category.BookedSchedule',
    path: '/booking-tutor',
    requiredRoles: [ROLES.TUTOR],
  },
  {
    id: '4',
    icon: props => <FontAwesomeIcon icon={faCalendarCheck} {...props} />,
    title: 'Category.BookedScheduleStudent',
    path: '/booking-student',
    requiredRoles: [ROLES.STUDENT],
  },
  {
    id: '5',
    icon: props => <FontAwesomeIcon icon={faHistory} {...props} />,
    title: 'Category.History',
    path: '/history',
    requiredRoles: [ROLES.TUTOR, ROLES.STUDENT],
  },
  {
    id: '6',
    icon: props => <FontAwesomeIcon icon={faGraduationCap} {...props} />,
    title: 'Category.courses',
    path: '/courses',
    requiredRoles: [ROLES.STUDENT],
  },
];
