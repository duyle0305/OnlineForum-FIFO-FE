import type { RootState } from '@/stores';
import type { GetProp, MenuProps } from 'antd';

import Icon from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BookMarkSvg from '/public/android.svg';
import HomeSvg from '/public/home.svg';
import ExploreSvg from '/public/source-code.svg';
import BaseMenu from '@/components/core/menu';
import { setAccountState } from '@/stores/account';
import { PATHS } from '@/utils/paths';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const PageMenuAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedKeys = useSelector((state: RootState) => state.account.selectedKeys);

    const items: MenuItem[] = [
        {
            key: PATHS.ADMIN_DASHBOARD,
            icon: <Icon component={() => <img src={HomeSvg} alt="home" />} />,
            label: 'Home',
            onClick: () => navigate(PATHS.HOME),
        },
    ];

    const onChangeSelectedKey = (path: string) => {
        dispatch(setAccountState({ selectedKeys: [path] }));
    };

    const onMenuClick = (path: string) => {
        onChangeSelectedKey(path);
        navigate(path);
    };

    return (
        <>
            <BaseMenu items={items} selectedKeys={selectedKeys} onSelect={k => onMenuClick(k.key)} />
        </>
    );
};
