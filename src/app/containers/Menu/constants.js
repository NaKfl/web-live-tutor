import { ROLES } from 'utils/constants';

export const MenuBarListItems = [
  {
    id: '1',
    title: 'Category.tutor',
    path: '/',
    requiredRoles: [ROLES.STUDENT],
  },
  {
    id: '2',
    title: 'Category.courses',
    path: '/courses',
    requiredRoles: [ROLES.STUDENT],
  },
  {
    id: '3',
    title: 'Category.schedule',
    path: '/schedule-tutor',
    requiredRoles: [ROLES.TUTOR],
  },
];
