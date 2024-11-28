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
import { useRewardDownload } from '@/hooks/query/redeem/use-reward-download';

const { confirm } = Modal;

interface RewardItemProps {
    reward: RedeemDocument;
    onClick?: OnAction;
}

const RewardItem: FC<RewardItemProps> = ({ reward, onClick }) => {
    const { name, type, image, price, status, sectionList, rewardId, linkSourceCode } = reward;

    const queryClient = useQueryClient();
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const { data: wallet, isLoading } = useGetWalletByAccount(accountInfo?.accountId as string);

    const { success, error } = useMessage();

    const { trigger: download } = useRewardDownload(rewardId);

    return (
        <RewardCard
            hoverable
            style={{ width: 348 }}
            cover={<img alt="example" src={image || PlaceholderSvg} style={{ height: 180, objectFit: 'cover' }} />}
            onClick={onClick}
            title={
                <Flex justify="center">
                    <Typography.Title level={4}>{name}</Typography.Title>
                </Flex>
            }
        >
            <Flex justify="center">
                <SecondaryButton
                    onClick={e => {
                        e.stopPropagation();
                        download();
                    }}
                >
                    <a href={linkSourceCode} download>
                        Download
                    </a>
                </SecondaryButton>
            </Flex>
        </RewardCard>
    );
};

export default RewardItem;
