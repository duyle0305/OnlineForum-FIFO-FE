import React, { useRef, useState, type FC } from 'react';
import '../index.less';

import { theme as antTheme, Avatar, Dropdown, Flex, Layout, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '/public/ftech-logo.svg';
import {
    CaretDownFilled,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoneyCollectOutlined,
    UserOutlined,
    WalletOutlined,
} from '@ant-design/icons';
import BaseInput from '@/components/core/input';
import { PATHS } from '@/utils/paths';
import BackgroundPlaceholder from '/public/background-placeholder.svg';
import { RootState } from '@/stores';
import { loggout } from '@/stores/account';
import NotificationIcon from './components/notification';
import { useCategorySearch } from '@/hooks/query/utility/use-category-search';
import { useDebounce } from '@/hooks/use-debounce';

const { Header } = Layout;

interface HeaderProps {
    collapsed: boolean;
    toggle: () => void;
}

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
    const { logged, device, accountInfo } = useSelector((state: RootState) => state.account);
    const navigate = useNavigate();
    const token = antTheme.useToken();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('  ');
    const [openSearch, setOpenSearch] = useState(false);

    const searchKeyword = useDebounce(keyword, 500);

    // const { data: searchData } = useCategorySearch({
    //     params: {
    //         keyword: searchKeyword || '  ',
    //     },
    // });

    const resetKeyword = () => {
        setKeyword('  ');
    };

    // const searchCategoryDropdownItems = searchData?.categoryList.map(category => ({
    //     key: category.categoryId,
    //     label: category.name,
    //     onClick: () => {
    //         navigate(`${PATHS.POSTS}?category=${category.categoryId}`);
    //         resetKeyword();
    //     },
    // }));

    // const searchTopicDropdownItems = searchData?.topicList.map(topic => ({
    //     key: topic.topicId,
    //     label: topic.name,
    //     onClick: () => {
    //         navigate(`${PATHS.POSTS}?topic=${topic.topicId}`);
    //         resetKeyword();
    //     },
    // }));

    // const searchPostDropdownItems = searchData?.postList.map(post => ({
    //     key: post.postId,
    //     label: post.title,
    //     onClick: () => {
    //         navigate(PATHS.POSTS);
    //         resetKeyword();
    //     },
    // }));

    // const searchAccountDropdownItems = searchData?.accountList.map(account => ({
    //     key: account.accountId,
    //     label: account.username,
    //     onClick: () => {
    //         navigate(PATHS.USER_PROFILE.replace(':id', account?.accountId));
    //         resetKeyword();
    //     },
    // }));

    // const searchDropdownItems = [
    //     ...(searchCategoryDropdownItems || []),
    //     ...(searchTopicDropdownItems || []),
    //     ...(searchPostDropdownItems || []),
    //     ...(searchAccountDropdownItems || []),
    // ];

    const onLogout = async () => {
        localStorage.clear();
        dispatch(loggout());
        navigate(PATHS.SIGNIN);
    };

    const toLogin = () => {
        navigate(PATHS.SIGNIN);
    };

    const toProfile = () => {
        navigate(PATHS.PROFILE);
    };

    const toHome = () => {
        navigate(PATHS.HOME);
    };

    const toWallet = () => {
        navigate(PATHS.WALLET);
    };

    const toDeposit = () => {
        navigate(PATHS.DEPOSIT);
    };

    const handleNavigateWithParams = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(`${PATHS.SEARCH}?keyword=${keyword}`);
        }
    };

    return (
        <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
            {device !== 'MOBILE' && (
                <div className="logo" style={{ width: collapsed ? 80 : 200, cursor: 'pointer' }} onClick={toHome}>
                    <img src={Logo} alt="logo.svg" style={{ marginRight: collapsed ? '2px' : '20px' }} />
                </div>
            )}

            <div className="layout-page-header-main">
                <div onClick={toggle}>
                    <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
                </div>

                <div className="search-container">
                    {/* <Dropdown
                        open={false}
                        menu={{
                            items: searchDropdownItems,
                        }}
                    > */}
                    <BaseInput.Search
                        placeholder="Type here to search..."
                        className="search"
                        onChange={e => setKeyword(e.target.value)}
                        // onBlur={() => setOpenSearch(false)}
                        // onFocus={() => setOpenSearch(true)}
                        onKeyDown={handleNavigateWithParams}
                    />
                    {/* </Dropdown> */}
                </div>

                <div className="actions">
                    {logged && accountInfo ? (
                        <Flex gap={20} align="center">
                            <NotificationIcon />
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: '0',
                                            icon: <WalletOutlined />,
                                            label: <span onClick={toWallet}>Wallet</span>,
                                        },
                                        {
                                            key: '1',
                                            icon: <MoneyCollectOutlined />,
                                            label: <span onClick={toDeposit}>Deposit</span>,
                                        },
                                        {
                                            key: '2',
                                            icon: <UserOutlined />,
                                            label: <span onClick={toProfile}>Profile</span>,
                                        },
                                        {
                                            key: '3',
                                            icon: <LogoutOutlined />,
                                            label: <span onClick={onLogout}>Logout</span>,
                                        },
                                    ],
                                }}
                            >
                                <span className="user-action">
                                    <Flex align="center" gap={5}>
                                        <Avatar
                                            size={42}
                                            src={BackgroundPlaceholder}
                                            className="user-avator"
                                            alt="avator"
                                        />
                                        <Typography.Text style={{ fontWeight: 500 }}>
                                            {accountInfo.username}
                                        </Typography.Text>
                                        <CaretDownFilled />
                                    </Flex>
                                </span>
                            </Dropdown>
                        </Flex>
                    ) : (
                        <span style={{ cursor: 'pointer' }} onClick={toLogin}>
                            Login
                        </span>
                    )}
                </div>
            </div>
        </Header>
    );
};

export default HeaderComponent;
