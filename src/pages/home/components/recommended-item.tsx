import { Button, Flex, Image, Typography } from 'antd';
import AmdSvg from '/public/amd.svg';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Account } from '@/types/account';
import { Follow } from '@/types/follow';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useCreateFollow } from '@/hooks/mutate/follow/use-create-follow';
import { useDeleteFollow } from '@/hooks/mutate/follow/use-delete-follow';
import { useQueryClient } from '@tanstack/react-query';
import { followKeys } from '@/consts/factory/follow';
import { useToggleFollow } from '@/hooks/mutate/follow/use-toggle-follow';
import { useMessage } from '@/hooks/use-message';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/utils/paths';
import { useDispatch } from 'react-redux';
import { setAccountState } from '@/stores/account';

interface RecommendedItemProps {
    account: Account;
    follows?: Follow[];
}

export const RecommendedItem = ({ account, follows }: RecommendedItemProps) => {
    const navigate = useNavigate();

    const { accountInfo } = useSelector((state: RootState) => state.account);

    const dispatch = useDispatch();

    const { mutate: toggleFollow } = useToggleFollow();

    const { error } = useMessage();
    const queryClient = useQueryClient();

    const handleToggleFollow = () => {
        toggleFollow(account?.accountId, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: followKeys.listing(),
                });
                queryClient.invalidateQueries({
                    queryKey: followKeys.recommendations(),
                });
            },
            onError: err => {
                error(err.message);
            },
        });
    };

    return (
        <Flex align="flex-start" gap={10} justify="space-between" onClick={() => navigate(PATHS.RECOMMENDATIONS)}>
            <Flex gap={10}>
                <Image
                    style={{
                        borderRadius: 10,
                        width: 58,
                        height: 58,
                        objectFit: 'cover',
                        boxShadow: '0px 3px 4px 0px #FA89240F',
                    }}
                    src={account?.avatar || AmdSvg}
                    alt="creator"
                    preview={false}
                />

                <Flex
                    vertical
                    style={{ minWidth: 94 }}
                    onClick={e => {
                        e.stopPropagation();
                        navigate(`/user-profile/${account?.accountId}`);
                        dispatch(setAccountState({ userInfo: account }));
                    }}
                >
                    <Typography.Text>{account?.username}</Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {account?.handle}
                    </Typography.Text>
                </Flex>
            </Flex>

            {follows?.find(follow => follow?.followee?.accountId === account?.accountId) ? (
                <Button
                    type="primary"
                    size="small"
                    onClick={e => {
                        e.stopPropagation();
                        handleToggleFollow();
                    }}
                >
                    <MinusOutlined style={{ fontSize: 12 }} />
                    Unfollow
                </Button>
            ) : (
                <Button
                    type="primary"
                    size="small"
                    onClick={e => {
                        e.stopPropagation();
                        handleToggleFollow();
                    }}
                >
                    <PlusOutlined style={{ fontSize: 12 }} />
                    Follow
                </Button>
            )}
        </Flex>
    );
};
