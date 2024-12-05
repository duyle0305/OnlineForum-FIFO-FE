import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { PaginationParams } from '@/types';
import { PostWrapper } from '../layout/post-wrapper';
import { PostItem } from '@/components/post/post-item';
import { Empty } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { PostStatus } from '@/types/post/post';

export const HomePostList = () => {
    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const [searchParams, setSearchParams] = useSearchParams();

    const topicId = searchParams.get('topicId') || undefined;
    const tagId = searchParams.get('tagId') || undefined;
    const categoryId = searchParams.get('category') || undefined;
    
    const { data } = usePostsListing({
        params: {
            ...initialParams,
            tagId,
            topicId,
            statuses: [PostStatus.PUBLIC],
            categoryId,
            isFolloweeIncluded: true,
        },
    });

    return <PostWrapper>{data ? data.map(post => <PostItem data={post} key={post.postId} />) : <Empty />}</PostWrapper>;
};
