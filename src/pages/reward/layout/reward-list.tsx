import { useRedeemDocuments, useRewardDetail } from '@/hooks/query/redeem/use-redeem-documents';
import { Divider, Empty, Flex, Image, Modal, Typography } from 'antd';
import RewardItem from '../components/reward-item';
import { useState } from 'react';
import { SecondaryButton } from '@/components/core/secondary-button';
import PlaceholderSvg from '/public/placeholder.svg';
import { useMessage } from '@/hooks/use-message';
import { useCreateRedeem } from '@/hooks/mutate/redeem/use-create-redeem';
import { useGetWalletByAccount } from '@/hooks/query/wallet/use-get-wallet-by-account';
import { RootState } from '@/stores';
import { useSelector } from 'react-redux';
import { walletKeys } from '@/consts/factory/wallet';
import { redeemKeys } from '@/consts/factory/redeem';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { FULL_TIME_FORMAT } from '@/consts/common';
import { PATHS } from '@/utils/paths';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

const RewardList = () => {
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const [isOpened, setIsOpened] = useState(false);
    const [selectedReward, setSelectedReward] = useState<string>();

    const { data: detail } = useRewardDetail(selectedReward as string);
    const { data } = useRedeemDocuments();
    const { data: wallet, isLoading } = useGetWalletByAccount(accountInfo?.accountId as string);

    const { success, error } = useMessage();
    const queryClient = useQueryClient();

    const { mutate: createRedeem, isPending: isPendingCreateRedeem } = useCreateRedeem();
    
    const navigate = useNavigate();

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
                            -{detail?.price} MC
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
                                color: (wallet?.balance || 0) - (detail?.price || 0) < 0 ? 'red' : 'black',
                            }}
                        >
                            Remaining:
                        </Typography.Title>
                        <Typography.Title
                            level={4}
                            style={{
                                color: (wallet?.balance || 0) - (detail?.price || 0) < 0 ? 'red' : 'black',
                            }}
                        >
                            {(wallet?.balance || 0) - (detail?.price || 0)} MC
                        </Typography.Title>
                    </Flex>
                    <Divider />
                </>
            ),
            onOk: () => {
                createRedeem(
                    { accountId: accountInfo?.accountId || '', rewardId: detail?.rewardId || '' },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: walletKeys.getByAccount(accountInfo?.accountId || ''),
                            });
                            queryClient.invalidateQueries({
                                queryKey: redeemKeys.documents(),
                            });
                            success('Redeem successfully');
                            setIsOpened(false);
                            setSelectedReward(undefined);
                        },
                        onError: err => {
                            error(err.message);
                            navigate(PATHS.DEPOSIT)
                        },
                    },
                );
            },
        });
    };

    if (!data || !data.length) {
        return <Empty />;
    }

    return (
        <>
            <Flex align="center" justify="space-between" wrap gap={10}>
                {data.map(reward => (
                    <RewardItem
                        reward={reward}
                        key={reward.rewardId}
                        onClick={() => {
                            setIsOpened(true);
                            setSelectedReward(reward.rewardId);
                        }}
                    />
                ))}
            </Flex>

            <Modal
                open={isOpened}
                onCancel={() => {
                    setIsOpened(false);
                    setSelectedReward(undefined);
                }}
                footer={null}
                width={'80vw'}
            >
                <Flex gap={20}>
                    <Flex vertical gap={10}>
                        <Image
                            src={detail?.image || PlaceholderSvg}
                            alt={detail?.name}
                            style={{
                                width: 300,
                                height: 300,
                                objectFit: 'cover',
                            }}
                        />
                        <Flex gap={10} align="center" justify="space-between">
                            <Typography.Title level={4}>{detail?.price} MC</Typography.Title>
                            <SecondaryButton
                                onClick={e => {
                                    e.stopPropagation();
                                    handleCreateRedeem();
                                }}
                            >
                                Buy
                            </SecondaryButton>
                        </Flex>
                    </Flex>

                    <Typography.Paragraph>
                        <Flex vertical gap={10}>
                            <Typography.Title level={2}>{detail?.name}</Typography.Title>
                            <Typography.Text type="secondary">
                                {dayjs(detail?.createdDate).format(FULL_TIME_FORMAT)}
                            </Typography.Text>

                            <div dangerouslySetInnerHTML={{ __html: detail?.description || '' }} />
                        </Flex>
                    </Typography.Paragraph>
                </Flex>
            </Modal>
        </>
    );
};

export default RewardList;
