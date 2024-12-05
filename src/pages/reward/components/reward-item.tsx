import RewardCard from '@/components/core/reward-card';
import { SecondaryButton } from '@/components/core/secondary-button';
import { useCreateRedeem } from '@/hooks/mutate/redeem/use-create-redeem';
import { RootState } from '@/stores';
import { RedeemDocument } from '@/types/redeem/redeem';
import { Divider, Flex, Modal, Space, Typography } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import PlaceholderSvg from '/public/placeholder.svg';
import { useMessage } from '@/hooks/use-message';
import { useQueryClient } from '@tanstack/react-query';
import { walletKeys } from '@/consts/factory/wallet';
import { useGetWalletByAccount } from '@/hooks/query/wallet/use-get-wallet-by-account';
import { redeemKeys } from '@/consts/factory/redeem';
import { OnAction } from '@/types';

const { confirm } = Modal;

interface RewardItemProps {
    reward: RedeemDocument;
    onClick?: OnAction;
}

const RewardItem: FC<RewardItemProps> = ({ reward, onClick }) => {
    const { name, type, image, price, status, sectionList, rewardId } = reward;

    const queryClient = useQueryClient();
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const { data: wallet, isLoading } = useGetWalletByAccount(accountInfo?.accountId as string);

    const { success, error } = useMessage();

    const { mutate: createRedeem, isPending: isPendingCreateRedeem } = useCreateRedeem();

    const handleCreateRedeem = () => {
        confirm({
            title: 'Confirm',
            content: (
                <>
                    <Typography.Text type="secondary">Do you want to redeem this reward?</Typography.Text>
                    <Flex vertical align="center">
                        <Typography.Title
                            level={3}
                            color="#FF6934"
                            style={{
                                color: '#FF6934',
                                marginTop: 24,
                            }}
                        >
                            -{price} MC
                        </Typography.Title>
                    </Flex>
                    <Divider />
                    <Flex justify="space-between">
                        <Typography.Title level={4}>Balance:</Typography.Title>
                        <Typography.Title level={4}>{wallet?.balance} MC</Typography.Title>
                    </Flex>
                    <Flex justify="space-between">
                        <Typography.Title
                            level={4}
                            style={{
                                color: (wallet?.balance || 0) - price < 0 ? 'red' : 'black',
                            }}
                        >
                            Remaining:
                        </Typography.Title>
                        <Typography.Title
                            level={4}
                            style={{
                                color: (wallet?.balance || 0) - price < 0 ? 'red' : 'black',
                            }}
                        >
                            {(wallet?.balance || 0) - price} MC
                        </Typography.Title>
                    </Flex>
                    <Divider />
                </>
            ),
            onOk: () => {
                createRedeem(
                    { accountId: accountInfo?.accountId || '', rewardId },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: walletKeys.getByAccount(accountInfo?.accountId || ''),
                            });
                            queryClient.invalidateQueries({
                                queryKey: redeemKeys.documents(),
                            });
                            success('Redeem successfully');
                        },
                        onError: err => {
                            error(err.message);
                        },
                    },
                );
            },
        });
    };

    return (
        <RewardCard
            hoverable
            style={{ width: 348 }}
            cover={<img alt="example" src={image || PlaceholderSvg} style={{ height: 180, objectFit: 'cover' }} />}
            onClick={onClick}
        >
            <Space direction="vertical" size={10}>
                <Typography.Title level={4}>{name}</Typography.Title>
                <Typography.Text style={{ color: '#FF6934' }}>{price} MC</Typography.Text>
            </Space>

            <Flex justify="flex-end">
                <SecondaryButton
                    loading={isPendingCreateRedeem}
                    onClick={e => {
                        e.stopPropagation();
                        handleCreateRedeem();
                    }}
                >
                    Buy
                </SecondaryButton>
            </Flex>
        </RewardCard>
    );
};

export default RewardItem;
