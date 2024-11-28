import { Avatar, Button, Dropdown, Flex, Image, Modal, Space, Typography } from 'antd';
import BackgroundPlaceholder from '/public/background-placeholder.svg';
import AvatarPlaceholder from '/public/avatar-placeholder.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import {
    CheckCircleOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    PlusCircleFilled,
    StopOutlined,
} from '@ant-design/icons';
import { useToggleBlock } from '@/hooks/mutate/block/use-toggle-block';
import { useBlocksListing } from '@/hooks/query/block/use-block-listing';
import { useMessage } from '@/hooks/use-message';
import { useQueryClient } from '@tanstack/react-query';
import { blockKeys } from '@/consts/factory/block';
import { useGetFollows } from '@/hooks/query/follow/use-follow-listing';
import { useToggleFollow } from '@/hooks/mutate/follow/use-toggle-follow';
import { followKeys } from '@/consts/factory/follow';

const { confirm } = Modal;

interface ProfileInfoProps {
    setIsShowReportReasons: (value: boolean) => void;
}

export const ProfileInfo = ({ setIsShowReportReasons }: ProfileInfoProps) => {
    const { accountInfo, userInfo } = useSelector((state: RootState) => state.account);

    const { success, error } = useMessage();
    const queryClient = useQueryClient();

    const { data: follows } = useGetFollows();
    const { data: blocks } = useBlocksListing();
    const { mutate: toggleBlock } = useToggleBlock();
    const { mutate: toggleFollow } = useToggleFollow();

    const isBlocked = blocks?.find(block => block?.accountId === userInfo?.accountId);

    console.log(userInfo)

    const isFollowed = follows?.find(follow => follow?.followee?.accountId === userInfo?.accountId);

    const handleToggleBlock = () => {
        confirm({
            title: isBlocked
                ? `Do you want to unblock ${userInfo?.username}?`
                : `Do you want to block ${userInfo?.username}?`,
            onOk() {
                toggleBlock(
                    { accountID: userInfo?.accountId as string },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: blockKeys.listing(),
                            });
                            success(isBlocked ? 'Unblocked successfully' : 'Blocked successfully');
                        },
                        onError: err => {
                            error(err.message);
                        },
                    },
                );
            },
        });
    };

    const handleToggleFollow = () => {
        toggleFollow(userInfo?.accountId as string, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: followKeys.listing(),
                });
            },
        });
    };

    return (
        <Flex vertical gap={92}>
            <div style={{ position: 'relative' }}>
                <Image
                    src={userInfo?.coverImage || accountInfo?.coverImage || BackgroundPlaceholder}
                    alt="logo"
                    width="100%"
                    height={260}
                    style={{ objectFit: 'cover' }}
                />
                <Avatar
                    shape="circle"
                    size={136}
                    src={userInfo?.avatar || accountInfo?.avatar || AvatarPlaceholder}
                    style={{ position: 'absolute', top: 200, left: 20 }}
                />

                <Flex gap={20}>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    icon: <ExclamationCircleOutlined />,
                                    label: 'Report',
                                    onClick: () => setIsShowReportReasons(true),
                                },
                                {
                                    key: '2',
                                    icon: isBlocked ? <CheckCircleOutlined /> : <StopOutlined />,
                                    label: isBlocked ? 'Unblock' : 'Block',
                                    onClick: handleToggleBlock,
                                },
                            ],
                        }}
                    >
                        <Button
                            icon={<EllipsisOutlined />}
                            variant="outlined"
                            style={{ position: 'absolute', top: 280, right: 120 }}
                        />
                    </Dropdown>

                    <Button
                        onClick={handleToggleFollow}
                        style={{ position: 'absolute', top: 280, right: 20 }}
                    >
                        {isFollowed ? 'UnFollow' : 'Follow'}
                    </Button>
                </Flex>
            </div>
            <Flex vertical gap={8}>
                <Typography.Title level={4}>{userInfo?.username || accountInfo?.username}</Typography.Title>
                <Typography.Text type="secondary">@{userInfo?.handle || accountInfo?.handle}</Typography.Text>
                <Typography.Text>#Beingnobody_goingnowhere.</Typography.Text>
                <Flex gap={24}>
                    <Space size="small">
                        <Typography.Text>100</Typography.Text>
                        <Typography.Text type="secondary">Followings</Typography.Text>
                    </Space>

                    <Space>
                        <Typography.Text>118</Typography.Text>
                        <Typography.Text type="secondary">Followers</Typography.Text>
                    </Space>
                </Flex>
            </Flex>
        </Flex>
    );
};
