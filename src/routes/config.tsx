import { useEffect, useLayoutEffect, type FC, type ReactElement } from 'react';
import { useNavigate, type RouteProps } from 'react-router';


import { RoleName } from '@/types/role';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { log } from 'console';
import { PATHS } from '@/utils/paths';
import { App } from 'antd';

export type WrapperRouteProps = RouteProps & {
  /** document title locale id */
  title: string;

  requiredAuth?: boolean
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ title, requiredAuth = true, ...props }) => {
  const { logged } = useSelector((state: RootState) => state.account);
  const { message } = App.useApp();
  const navigate = useNavigate();

  if (title) {
    document.title = title;
  }

  useEffect(() => {
    if (requiredAuth && !logged) {
      navigate(PATHS.SIGNIN)
    }

  }, [requiredAuth, logged])

  return (props.element as ReactElement);
};

export default WrapperRouteComponent;
