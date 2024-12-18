import type { RootState } from '@/stores';
import type { GetProp, MenuProps } from 'antd';

import Icon from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// import BookMarkSvg from '/public/android.svg';
import ExploreSvg from '/public/source-code.svg';
import BaseMenu from '@/components/core/menu';
import { setAccountState } from '@/stores/account';
import { PATHS } from '@/utils/paths';

import BookMarkSvg from '../../../assets/icons/Book-Mark.svg';
import HomeSvg from '../../../assets/icons/Home.svg';
import SourceCodeSvg from '../../../assets/icons/Source-Code.svg';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const PageMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedKeys = useSelector((state: RootState) => state.account.selectedKeys);
    const location = useLocation();

    useEffect(() => {
        const selectedItems = document.getElementsByClassName('ant-menu-item-selected');

        Array.from(selectedItems).forEach(item => {
            if (item.getAttribute('title') !== location.pathname) {
                item.classList.remove('ant-menu-item-selected');
            }
        });
    }, [location]);

    const items: MenuItem[] = [
        {
            key: PATHS.HOME,
            icon: (
                <Icon
                    component={() => <img src={HomeSvg} alt="home" />}
                    style={{ border: '1px solid #ccc', justifyContent: 'center' }}
                />
            ),
            label: 'Home',
            title: PATHS.HOME,
            onClick: () => navigate(PATHS.HOME),
        },
        {
            key: PATHS.BOOKMARKS,
            icon: (
                <Icon
                    component={() => <img src={BookMarkSvg} alt="bookmark" />}
                    style={{ border: '1px solid #ccc', justifyContent: 'center' }}
                />
            ),
            label: 'Book Mark',
            title: PATHS.BOOKMARKS,
            onClick: () => navigate(PATHS.BOOKMARKS),
        },
        {
            key: PATHS.EXPLORE,
            icon: (
                <Icon
                    component={() => <img src={SourceCodeSvg} alt="explore" />}
                    style={{ border: '1px solid #ccc', justifyContent: 'center' }}
                />
            ),
            title: PATHS.EXPLORE,
            label: 'Source Code & Download',
            onClick: () => navigate(PATHS.EXPLORE),
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
