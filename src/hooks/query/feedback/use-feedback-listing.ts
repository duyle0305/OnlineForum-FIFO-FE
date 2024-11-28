import  { request } from '@/apis/request';
import { feedbackKeys } from '@/consts/factory/feedback';
import { CreateFeedbackPayload, Feedback } from '@/types/feedback/feedback';
import { PaginationParams } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type FeedbackListingParams = PaginationParams;

type FeedbackListingProps = {};

export const useFeedbackListing = () => {
    const fetchFeedback = async () => {
        const { entity } = await request<Feedback[]>(
            'get',
            '/feedback/get-all',
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

    return useQuery<Feedback[]>({
        queryKey: feedbackKeys.listing(),
        queryFn: fetchFeedback,
        placeholderData: keepPreviousData,
    });
};
