import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { useGetAllComments } from '@/hooks/query/comment/use-comment-by-post';
import { useCommentListing } from '@/hooks/query/comment/use-comment-listing';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { useUpvoteListing } from '@/hooks/query/upvote/use-upvote-listing';
import { Notification } from '@/types/notification';
import { StarIcon } from '@/utils/asset';
import { css } from '@emotion/react';
import { Avatar, Card, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';

interface NotificationItemProps {
    notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
    const { data: upvotes } = useUpvoteListing();
    const { data: comments } = useGetAllComments();
    const { data: posts } = usePostsListing({
        params: {
            page: DEFAULT_PAGE,
            perPage: DEFAULT_PAGE_SIZE,
        },
    });

    if (!notification) return null;

    const notiParsed = notification?.message?.includes('{') 
     ? JSON.parse(notification?.message ?? '{}') : notification?.message;

    return (
        <Card css={styles}>
            <Flex vertical gap={6}>
                <Flex align="center" gap={10}>
                    <div>
                        <img src={StarIcon}></img>
                    </div>
                    <div>
                        <Avatar src={notification?.account?.avatar} />
                    </div>
                </Flex>
                <div>
                    <Typography.Text className="notification-title">{notification?.title}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>
                        {notiParsed?.entity === 'Upvote' &&
                            `${
                                upvotes?.find(upvote => upvote?.upvoteId === notiParsed?.id)?.account?.username
                            } liked your post`}
                        {notiParsed?.entity === 'Comment' &&
                            `${
                                comments?.find(comment => comment?.commentId === notiParsed?.id)?.account?.username
                            } commented on your post`}
                        {notiParsed?.entity === 'Report' &&
                            `${
                                posts?.find(post => post?.postId === notiParsed?.id)?.account?.username
                            } reported on your post`}{' '}
                        {notiParsed?.entity === 'Daily point' && 'You have received daily point'}-{' '}
                        {notification?.createdDate ? dayjs(notification?.createdDate).format('DD/MM/YYYY') : ''}
                    </Typography.Text>
                </div>
            </Flex>
        </Card>
    );
};

const styles = css(`
    border-radius: 0;

    .notification-title {
        font-weight: 600;
        font-size: 16px;
    }

`);
export default NotificationItem;
