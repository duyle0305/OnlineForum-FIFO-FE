import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { PostItem } from '@/components/post/post-item';
import { useBookmarkListing } from '@/hooks/query/bookmark/use-bookmark-listing';
import { Card, Divider, Empty, Flex } from 'antd';

const BookmarksPage = () => {
    const { data } = useBookmarkListing();

    return (
        <Card>
            <PageBreadcrumbs />
            <Divider />
            {data?.length ? (
                <Flex vertical gap={20}>
                    {data?.map(post => (
                        <PostItem key={post.postId} data={post} />
                    ))}
                </Flex>
            ) : (
                <Empty />
            )}
        </Card>
    );
};

export default BookmarksPage;
