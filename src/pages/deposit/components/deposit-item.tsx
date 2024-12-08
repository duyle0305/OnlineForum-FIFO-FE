import type { OnAction } from '@/types';
import type { Pack } from '@/types/pack/pack';

import { EditOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Typography } from 'antd';

import PlaceholderSvg from '/public/placeholder.svg';
import RewardCard from '@/components/core/reward-card';
import { SecondaryButton } from '@/components/core/secondary-button';
import { packKeys } from '@/consts/factory/pack';
import { useBuyPoints } from '@/hooks/mutate/payment/use-buy-point';
import { useAuthorize } from '@/hooks/use-authorize';
import { useMessage } from '@/hooks/use-message';
import { numberFormat } from '@/utils/number';

interface DepositItemProps {
    pack: Pack;
    handleOpenUpdate?: OnAction;
    setPackId?: React.Dispatch<React.SetStateAction<string>>;
}

const DepositItem = ({ pack, handleOpenUpdate, setPackId }: DepositItemProps) => {
    const isAllowUpdatePack = useAuthorize();

    const queryClient = useQueryClient();
    const { success } = useMessage();

    const { mutate: buyPoint } = useBuyPoints();

    const handleBuy = () => {
        buyPoint(
            {
                monkeyCoinPackId: pack.monkeyCoinPackId,
                redirectUrl: window.location.href,
            },
            {
                onSuccess: data => {
                    window.open(data?.paymentUrl, '_blank');
                },
            },
        );
    };

    return (
        <Flex vertical>
            <RewardCard
                title={
                    <div style={{ position: 'relative' }}>
                        <Typography.Title level={5}>{numberFormat(pack?.point, '.')} MC</Typography.Title>
                        {/* <Typography.Title level={5}>{pack?.point} MC</Typography.Title> */}

                        {isAllowUpdatePack && (
                            <Button
                                type="text"
                                size="small"
                                icon={<EditOutlined style={{ fontSize: 16 }} />}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }}
                                onClick={() => {
                                    handleOpenUpdate?.();
                                    setPackId?.(pack.monkeyCoinPackId);
                                }}
                            />
                        )}
                    </div>
                }
                hoverable
                style={{ width: 348 }}
                cover={
                    <img
                        alt="example"
                        src={pack?.imgUrl || PlaceholderSvg}
                        style={{ height: 180, objectFit: 'cover' }}
                    />
                }
                className="deposit-item"
            >
                <Flex justify="space-between" align="center">
                    <Typography.Title level={4}>{numberFormat(pack?.price, '.')} VND</Typography.Title>

                    <SecondaryButton onClick={handleBuy}>Buy</SecondaryButton>
                </Flex>
            </RewardCard>
        </Flex>
    );
};

export default DepositItem;
