import type { RootState } from '@/stores';

import { App } from 'antd';
import { log } from 'console';
import { type FC, type ReactElement, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { type RouteProps, useNavigate } from 'react-router';

import { RoleName } from '@/types/role';
import { PATHS } from '@/utils/paths';

export type WrapperRouteProps = RouteProps & {
    /** document title locale id */
    title: string;

    requiredAuth?: boolean;
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
            navigate(PATHS.SIGNIN);
        }
    }, [requiredAuth, logged]);

    return props.element as ReactElement;
};

export default WrapperRouteComponent;
