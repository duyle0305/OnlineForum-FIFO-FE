import { useCommentByPost } from '@/hooks/query/comment/use-comment-by-post';
import { CommentCreatePayload, CreateReplyPayload, TComment } from '@/types/comment/comment';
import { Comment } from '@ant-design/compatible';
import { Button, Dropdown, Flex, Form, Input, InputRef, List, Modal, Tooltip } from 'antd';
import AvatarPlaceholder from '/public/avatar-placeholder.svg';
import { CloseOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useDeleteComment } from '@/hooks/mutate/comment/use-delete-comment';
import { useMessage } from '@/hooks/use-message';
import { useQueryClient } from '@tanstack/react-query';
import { commentKeys } from '@/consts/factory/comment';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useUpdateComment } from '@/hooks/mutate/comment/use-update-comment';
import { useCreateReply } from '@/hooks/mutate/comment/use-create-comment';
import { postKeys } from '@/consts/factory/post';

const { confirm } = Modal;

interface PostCommentListProps {
    postId: string;
    isShown: boolean;
}

const PostCommentList = ({ postId, isShown }: PostCommentListProps) => {
    const inputRef = useRef<any>(null);
    const [form] = Form.useForm();
    const [formReply] = Form.useForm();

    const [commentId, setCommentId] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isEditReply, setIsEditReply] = useState(false);
    const [isShowReply, setIsShowReply] = useState(false);

    const { accountInfo } = useSelector((state: RootState) => state.account);

    const { success } = useMessage();
    const queryClient = useQueryClient();

    const { data: comments } = useCommentByPost(postId, isShown);
    const { mutate: deleteComment } = useDeleteComment();
    const { mutate: updateComment } = useUpdateComment();
    const { mutate: createReply } = useCreateReply();

    if (!comments) {
        return null;
    }

    const isAllowShowActions = (comment: TComment) => {
        return (
            accountInfo?.role?.name === 'ADMIN' ||
            accountInfo?.role?.name === 'STAFF' ||
            comment?.account?.accountId === accountInfo?.accountId
        );
    };

    const handleDelete = (comment: TComment) => {
        confirm({
            title: 'Are you sure you want to delete this comment?',
            onOk() {
                deleteComment(comment?.commentId, {
                    onSuccess: () => {
                        success('Delete comment successfully');
                        queryClient.invalidateQueries({
                            queryKey: postKeys.listing(),
                        });
                        queryClient.invalidateQueries({
                            queryKey: commentKeys.byPost(postId),
                        });
                    },
                });
            },
        });
    };

    const handleUpdate = (id: string) => {
        setIsEdit(true);
        setCommentId(id);
    };

    const handleUpdateReply = (id: string) => {
        setIsEditReply(true);
        setCommentId(id);
    };

    const handleClickOutside = () => {
        setIsEdit(false);
    };

    const handleClickOutsideReply = () => {
        setIsShowReply(false);
    };

    const onFinish = (values: CommentCreatePayload) => {
        updateComment(
            {
                content: values.content,
                id: commentId as string,
            },
            {
                onSuccess: () => {
                    setIsEdit(false);
                    setIsEditReply(false);
                    queryClient.invalidateQueries({
                        queryKey: postKeys.listing(),
                    });
                    queryClient.invalidateQueries({
                        queryKey: commentKeys.byPost(postId),
                    });
                },
            },
        );
    };

    const handleShowReply = (commentId: string) => {
        setIsShowReply(true);
        setCommentId(commentId);
    };

    const onFinishReply = (values: CreateReplyPayload) => {
        createReply(
            {
                ...values,
                postId,
                parentCommentId: commentId as string,
            },
            {
                onSuccess: () => {
                    setIsShowReply(false);
                    setCommentId(null);
                    formReply.resetFields();
                    queryClient.invalidateQueries({
                        queryKey: postKeys.listing(),
                    });
                    queryClient.invalidateQueries({
                        queryKey: commentKeys.byPost(postId),
                    });
                },
            },
        );
    };

    const renderShowReplyReplyRecursive = (comment: TComment) => {
        if (comment?.replies?.length) {
            return (
                <List
                    //  key={cj?.commentId}
                    className="comment-list"
                    header={`${comment?.replies?.length} replies`}
                    itemLayout="horizontal"
                    dataSource={comment?.replies}
                    rowKey={rep => rep?.commentId}
                    renderItem={(rep: TComment) => (
                        <li
                            style={{
                                position: 'relative',
                                width: '100%',
                            }}
                        >
                            <Comment
                                actions={[
                                    <>
                                        {isShowReply && commentId === rep.commentId ? (
                                            <Flex align="center" gap={8}>
                                                <Form<CreateReplyPayload> form={formReply} onFinish={onFinishReply}>
                                                    <Form.Item<CreateReplyPayload>
                                                        name="content"
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <Input
                                                            style={{
                                                                minWidth: 550,
                                                            }}
                                                            size="large"
                                                            ref={inputRef}
                                                            placeholder="Enter reply here..."
                                                        />
                                                    </Form.Item>
                                                </Form>
                                                <Button
                                                    size="small"
                                                    htmlType="button"
                                                    icon={<CloseOutlined />}
                                                    onClick={handleClickOutsideReply}
                                                />
                                            </Flex>
                                        ) : (
                                            <Button type="text" onClick={() => handleShowReply(rep.commentId)}>
                                                Reply
                                            </Button>
                                        )}
                                    </>,
                                ]}
                                author={rep?.account?.username}
                                avatar={rep?.account?.avatar || AvatarPlaceholder}
                                content={
                                    <>
                                        {isEditReply && commentId === rep.commentId ? (
                                            <Flex align="center" gap={8}>
                                                <Form<CommentCreatePayload>
                                                    form={formReply}
                                                    initialValues={{ content: rep?.content }}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    onFinish={onFinish}
                                                >
                                                    <Form.Item<CommentCreatePayload>
                                                        name="content"
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <Input size="large" ref={inputRef} />
                                                    </Form.Item>
                                                </Form>
                                                <Button
                                                    size="small"
                                                    htmlType="button"
                                                    icon={<CloseOutlined />}
                                                    onClick={handleClickOutside}
                                                />
                                            </Flex>
                                        ) : (
                                            rep?.content
                                        )}
                                    </>
                                }
                            >
                                {renderShowReplyReplyRecursive(rep)}
                            </Comment>

                            {isAllowShowActions(rep) && (
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: '0',
                                                icon: <EditOutlined />,
                                                label: <span>Edit reply</span>,
                                                onClick: () => handleUpdateReply(rep.commentId),
                                            },
                                            {
                                                key: '1',
                                                icon: <DeleteOutlined />,
                                                label: <span>Delete reply</span>,
                                                onClick: () => handleDelete(rep),
                                            },
                                        ],
                                    }}
                                >
                                    <Button
                                        style={{
                                            position: 'absolute',
                                            top: 4,
                                            right: 0,
                                        }}
                                        type="text"
                                        icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
                                    />
                                </Dropdown>
                            )}
                        </li>
                    )}
                />
            );
        }
    };

    return (
        <List
            className="comment-list"
            header={`${comments?.length} replies`}
            itemLayout="horizontal"
            dataSource={comments}
            rowKey={item => item?.commentId}
            renderItem={(item: TComment) => (
                <li
                    style={{
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <Comment
                        actions={[
                            <>
                                {isShowReply && commentId === item.commentId ? (
                                    <Flex align="center" gap={8}>
                                        <Form<CreateReplyPayload> form={formReply} onFinish={onFinishReply}>
                                            <Form.Item<CreateReplyPayload>
                                                name="content"
                                                style={{
                                                    marginBottom: 0,
                                                }}
                                            >
                                                <Input
                                                    style={{
                                                        minWidth: 550,
                                                    }}
                                                    size="large"
                                                    ref={inputRef}
                                                    placeholder="Enter reply here..."
                                                />
                                            </Form.Item>
                                        </Form>
                                        <Button
                                            size="small"
                                            htmlType="button"
                                            icon={<CloseOutlined />}
                                            onClick={handleClickOutsideReply}
                                        />
                                    </Flex>
                                ) : (
                                    <Button type="text" onClick={() => handleShowReply(item.commentId)}>
                                        Reply
                                    </Button>
                                )}
                            </>,
                        ]}
                        author={item?.account?.username}
                        avatar={item?.account?.avatar || AvatarPlaceholder}
                        content={
                            <>
                                {isEdit ? (
                                    <Flex align="center" gap={8}>
                                        <Form<CommentCreatePayload>
                                            form={form}
                                            initialValues={{ content: item?.content }}
                                            style={{
                                                width: '100%',
                                            }}
                                            onFinish={onFinish}
                                        >
                                            <Form.Item<CommentCreatePayload>
                                                name="content"
                                                style={{
                                                    marginBottom: 0,
                                                }}
                                            >
                                                <Input size="large" ref={inputRef} />
                                            </Form.Item>
                                        </Form>
                                        <Button
                                            size="small"
                                            htmlType="button"
                                            icon={<CloseOutlined />}
                                            onClick={handleClickOutside}
                                        />
                                    </Flex>
                                ) : (
                                    item?.content
                                )}
                            </>
                        }
                    >
                        {/* LIST REPLY */}
                        {/* {!!item?.replies?.length && (
                            <List
                                className="comment-list"
                                header={`${item?.replies?.length} replies`}
                                itemLayout="horizontal"
                                dataSource={item?.replies}
                                rowKey={rep => rep?.commentId}
                                renderItem={(rep: TComment) => (
                                    <li
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                        }}
                                    >
                                        <Comment
                                            author={rep?.account?.username}
                                            avatar={rep?.account?.avatar || AvatarPlaceholder}
                                            content={
                                                <>
                                                    {isEditReply && commentId === rep.commentId ? (
                                                        <Flex align="center" gap={8}>
                                                            <Form<CommentCreatePayload>
                                                                form={formReply}
                                                                initialValues={{ content: rep?.content }}
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                                onFinish={onFinish}
                                                            >
                                                                <Form.Item<CommentCreatePayload>
                                                                    name="content"
                                                                    style={{
                                                                        marginBottom: 0,
                                                                    }}
                                                                >
                                                                    <Input size="large" ref={inputRef} />
                                                                </Form.Item>
                                                            </Form>
                                                            <Button
                                                                size="small"
                                                                htmlType="button"
                                                                icon={<CloseOutlined />}
                                                                onClick={handleClickOutside}
                                                            />
                                                        </Flex>
                                                    ) : (
                                                        rep?.content
                                                    )}
                                                </>
                                            }
                                        />

                                        {isAllowShowActions(rep) && (
                                            <Dropdown
                                                menu={{
                                                    items: [
                                                        {
                                                            key: '0',
                                                            icon: <EditOutlined />,
                                                            label: <span>Edit reply</span>,
                                                            onClick: () => handleUpdateReply(rep.commentId),
                                                        },
                                                        {
                                                            key: '1',
                                                            icon: <DeleteOutlined />,
                                                            label: <span>Delete reply</span>,
                                                            onClick: () => handleDelete(rep),
                                                        },
                                                    ],
                                                }}
                                            >
                                                <Button
                                                    style={{
                                                        position: 'absolute',
                                                        top: 4,
                                                        right: 0,
                                                    }}
                                                    type="text"
                                                    icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
                                                />
                                            </Dropdown>
                                        )}
                                    </li>
                                )}
                            />
                        )} */}
                        {renderShowReplyReplyRecursive(item)}
                    </Comment>

                    {isAllowShowActions(item) && (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: '0',
                                        icon: <EditOutlined />,
                                        label: <span>Edit comment</span>,
                                        onClick: () => handleUpdate(item.commentId),
                                    },
                                    {
                                        key: '1',
                                        icon: <DeleteOutlined />,
                                        label: <span>Delete comment</span>,
                                        onClick: () => handleDelete(item),
                                    },
                                ],
                            }}
                        >
                            <Button
                                style={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 0,
                                }}
                                type="text"
                                icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
                            />
                        </Dropdown>
                    )}
                </li>
            )}
        />
    );
};

export default PostCommentList;
