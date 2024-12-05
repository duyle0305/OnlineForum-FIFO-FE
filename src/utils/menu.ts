import type { MenuList } from '@/types/layout/menu';
import { PATHS } from './paths';

const menuData: MenuList = [
  {
    id: PATHS.HOME,
    label: "Home",
    path: PATHS.HOME,
    permittedRoles: []
  },
];

export default menuData;
