import { useCurrentUserRewards } from '@/hooks/query/redeem/use-redeem-documents';
import { Empty, Flex } from 'antd';
import React from 'react';
import RewardItem from './reward-item';

const RewardList = () => {
    const { data } = useCurrentUserRewards();

        if (!data || !data.length) {
            return <Empty />;
        }

    return (
        <Flex align="center" justify="space-between" wrap gap={10}>
            {data.map(reward => (
                <RewardItem
                    reward={reward}
                    key={reward.rewardId}
                />
            ))}
        </Flex>
    );
};

export default RewardList;
