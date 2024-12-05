import { request } from '@/apis/request';
import { redeemKeys } from '@/consts/factory/redeem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useRewardDownload = (rewardId: string) => {
    const queryClient = useQueryClient();
    const [enabled, setEnabled] = useState(false);

    const getRewardDownload = async () => {
        const response = await request(
            'get',
            `/reward/${rewardId}/download`,
        );

        return response;
    };

    const query = useQuery({
        queryKey: redeemKeys.download(rewardId),
        queryFn: () => getRewardDownload(),
        enabled,
    });

    const trigger = () => {
        setEnabled(true);
    };

    if (query.isSuccess) {
        queryClient.resetQueries({
            queryKey: redeemKeys.download(rewardId),
        });
    }

    if ((query.isSuccess || query.isError) && enabled) {
        setEnabled(false);
    }

    return { trigger, ...query };
};
