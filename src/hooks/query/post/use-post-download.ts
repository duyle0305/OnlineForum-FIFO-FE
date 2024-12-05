import { request } from '@/apis/request';
import { postKeys } from '@/consts/factory/post';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const usePostDownload = (postId: string) => {
    const queryClient = useQueryClient();
    const [enabled, setEnabled] = useState(false);

    const getPostDownload = async () => {
        const response = await request(
            'get',
            `/post/download/${postId}`,
        );

        return response;
    };

    const query = useQuery({
        queryKey: postKeys.download(postId),
        queryFn: () => getPostDownload(),
        enabled: enabled && !!postId,
    });

    const trigger = () => {
        setEnabled(true);
    };

    // if (query.isSuccess) {
    //     queryClient.resetQueries({
    //         queryKey: postKeys.download(postId),
    //     });
    // }

    if ((query.isSuccess || query.isError) && enabled) {
        setEnabled(false);
    }

    return { trigger, ...query };
};
