import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { PostItem } from '@/components/post/post-item';
import { useGetPost } from '@/hooks/query/post/use-get-post';
import { Card, Divider, Flex } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
    const { id } = useParams();

    const { data } = useGetPost(id || '');

    return (
        <Flex vertical gap={20}>
            <Card>
                <PageBreadcrumbs />
                <Divider />
            </Card>
            {data && <PostItem data={data} showComment={true} />}
        </Flex>
    );
};

export default PostDetailPage;
