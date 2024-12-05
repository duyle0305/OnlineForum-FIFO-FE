import { request } from '@/apis/request';
import { upvoteKeys } from '@/consts/factory/upvote';
import { utilityKeys } from '@/consts/factory/utility';
import { PaginationParams } from '@/types';
import { CategorySearch } from '@/types/utility/utility';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type CategorySearchParams = {
    keyword: string;
};

type CategorySearchProps = {
    params: CategorySearchParams;
};

export const useCategorySearch = ({ params }: CategorySearchProps) => {
    const fetchCategorySearch = async () => {
        const { entity } = await request<CategorySearch>('get', '/utility/search', params, {
            paramsSerializer: {
                indexes: null,
            },
        });

        return entity;
    };

    return useQuery<CategorySearch>({
        queryKey: utilityKeys.categorySearch({params}),
        queryFn: fetchCategorySearch,
        placeholderData: keepPreviousData,
    });
};
