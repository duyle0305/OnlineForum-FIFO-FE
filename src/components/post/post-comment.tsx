import { Avatar, Flex, Form, Input } from 'antd';
import React, { useState } from 'react';
import PostCommentList from './post-comment-list';
import { CommentCreatePayload } from '@/types/comment/comment';
import { useCreateComment } from '@/hooks/mutate/comment/use-create-comment';
import { RootState } from '@/stores';
import { useSelector } from 'react-redux';
import { SecondaryButton } from '../core/secondary-button';
import AvatarPlaceholder from '/public/avatar-placeholder.svg';
import { useDeleteComment } from '@/hooks/mutate/comment/use-delete-comment';
import { useQueryClient } from '@tanstack/react-query';
import { commentKeys } from '@/consts/factory/comment';
import { bookmarkKeys } from '@/consts/factory/bookmark';

interface PostCommentProps {
    postId: string;
    isShown: boolean;
}

const PostComment = ({ postId, isShown }: PostCommentProps) => {
    const [form] = Form.useForm();

    const queryClient = useQueryClient();
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const { mutate: createComment, isPending: isPendingCreateComment } = useCreateComment();

    const onFinish = (values: CommentCreatePayload) => {
        createComment(
            { ...values, postId },
            {
                onSuccess: () => {
                    form.resetFields();
                    queryClient.invalidateQueries({
                        queryKey: commentKeys.byPost(postId),
                    });
                    queryClient.invalidateQueries({
                        queryKey: bookmarkKeys.listing(),
                    });
                },
            },
        );
    };

    return (
        <Flex vertical gap={16}>
            <Flex gap={24} align="center" justify="space-between">
                <Avatar src={accountInfo?.avatar || AvatarPlaceholder} style={{ minWidth: 32 }} />

                <Form
                    name="comment-form"
                    form={form}
                    onFinish={onFinish}
                    style={{
                        width: '100%',
                    }}
                >
                    <Form.Item<CommentCreatePayload>
                        name="content"
                        style={{
                            marginBottom: 0,
                        }}
                    >
                        <Input
                            style={{ width: '100%' }}
                            size="large"
                            placeholder="Enter you comment..."
                            disabled={isPendingCreateComment}
                        />
                    </Form.Item>
                </Form>

                <SecondaryButton form="comment-form" htmlType="submit" loading={isPendingCreateComment}>
                    Comment
                </SecondaryButton>
            </Flex>

            <PostCommentList postId={postId} isShown={isShown} />
        </Flex>
    );
};

export default PostComment;
