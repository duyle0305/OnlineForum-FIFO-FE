import React, { useEffect, useState, type FC } from 'react';
import '../index.less';

import { theme as antTheme, Avatar, Badge, Dropdown, Flex, Layout, notification, Typography } from 'antd';
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
import { useDebounce } from '@/hooks/use-debounce';
import { useNotifications } from '@/hooks/query/notification/use-notifications';
import { useUpvoteListing } from '@/hooks/query/upvote/use-upvote-listing';
import { useGetAllComments } from '@/hooks/query/comment/use-comment-by-post';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, SOCKET_EVENT } from '@/consts/common';
import { useWebSocket } from '@/utils/socket';
import { useQueryClient } from '@tanstack/react-query';
import { commentKeys } from '@/consts/factory/comment';
import { upvoteKeys } from '@/consts/factory/upvote';
import { postKeys } from '@/consts/factory/post';
import { bookmarkKeys } from '@/consts/factory/bookmark';

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
    const socket = useWebSocket();
    const queryClient = useQueryClient();

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (title: string, description: string) => {
        api.open({
            message: title,
            description,
        });
    };

    const searchKeyword = useDebounce(keyword, 500);

    // const { data: searchData } = useCategorySearch({
    //     params: {
    //         keyword: searchKeyword || '  ',
    //     },
    // });

    const { data: notifications } = useNotifications();
    const { data: upvotes } = useUpvoteListing();
    const { data: comments } = useGetAllComments();
    const { data: posts } = usePostsListing({
        params: {
            page: DEFAULT_PAGE,
            perPage: DEFAULT_PAGE_SIZE,
        },
    });

    const resetKeyword = () => {
        setKeyword('  ');
    };

    useEffect(() => {
        let timeOut: NodeJS.Timeout;

        if (
            notifications?.length !== undefined &&
            localStorage.getItem('count') !== undefined &&
            localStorage.getItem('count') !== '' &&
            notifications?.length > Number(localStorage.getItem('count'))
        ) {
            let content = '';
            console.log(notifications?.[0]?.message);
            const notiParsed = JSON.parse(notifications?.[0]?.message);

            if (notiParsed?.entity === 'Upvote') {
                content = `${
                    upvotes?.find(upvote => upvote?.upvoteId === notiParsed?.id)?.account?.username
                } liked your post`;
            } else if (notiParsed?.entity === 'Comment') {
                content = `${
                    comments?.find(comment => comment?.commentId === notiParsed?.id)?.account?.username
                } commented on your post`;
            } else if (notiParsed?.entity === 'Report') {
                content = `${
                    posts?.find(post => post?.postId === notiParsed?.id)?.account?.username
                } reported on your post`;
            } else if (notiParsed?.entity === 'Daily point') {
                content = 'You have received daily point';
            }

            openNotification(notifications?.[0]?.title, content);

            timeOut = setTimeout(() => {
                localStorage.setItem('count', notifications?.length.toString() || '');
            }, 5000);
        } else {
            localStorage.setItem('count', notifications?.length.toString() || '');
        }

        return () => {
            clearTimeout(timeOut);
        };
    }, [notifications]);

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

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on(SOCKET_EVENT.COMMENT, () => {
            queryClient.invalidateQueries({
                queryKey: postKeys.listing(),
            });
            queryClient.invalidateQueries({
                queryKey: bookmarkKeys.listing(),
            });
        });

        socket.on(SOCKET_EVENT.UPDATE_DELETE_COMMENT, () => {
            queryClient.invalidateQueries({
                queryKey: postKeys.listing(),
            });
            queryClient.invalidateQueries({
                queryKey: bookmarkKeys.listing(),
            });
        });

        socket.on(SOCKET_EVENT.LIKE, () => {
            queryClient.invalidateQueries({
                queryKey: upvoteKeys.listing(),
            });
            queryClient.invalidateQueries({
                queryKey: postKeys.listing(),
            });
            queryClient.invalidateQueries({
                queryKey: bookmarkKeys.listing(),
            });
        });

        socket.on(SOCKET_EVENT.DISLIKE, () => {
            queryClient.invalidateQueries({
                queryKey: upvoteKeys.listing(),
            });
            queryClient.invalidateQueries({
                queryKey: postKeys.listing(),
            });
            queryClient.invalidateQueries({
                queryKey: bookmarkKeys.listing(),
            });
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
            {contextHolder}
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
                            <Badge count={notifications?.length}>
                                <NotificationIcon />
                            </Badge>
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
                                            src={accountInfo?.avatar || BackgroundPlaceholder}
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
