import {
    Button,
    Card,
    Checkbox,
    Divider,
    Dropdown,
    Flex,
    Form,
    FormListFieldData,
    Image,
    Modal,
    Spin,
    Tag,
    Typography,
} from 'antd';
import { UserInfo } from '../user/user-info';
import { PostTag } from './post-tag';
import {
    BarChartOutlined,
    CommentOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    FileZipOutlined,
    GlobalOutlined,
    KeyOutlined,
    LikeFilled,
    LikeOutlined,
    ShareAltOutlined,
    TagOutlined,
} from '@ant-design/icons';
import { IconButton } from './icon-button';
import { useDispatch } from 'react-redux';
import { setPost } from '@/stores/post';
import { useDeleteDraftPost, useDeletePost } from '@/hooks/mutate/post/use-delete-post';
import { Post } from '@/types/post/post';
import { FC, useEffect, useState } from 'react';
import dayjsConfig from '@/utils/dayjs';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { postKeys } from '@/consts/factory/post';
import { useMessage } from '@/hooks/use-message';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useToggleUpvote } from '@/hooks/mutate/upvote/use-toggle-upvote';
import { useUpvoteListing } from '@/hooks/query/upvote/use-upvote-listing';
import { upvoteKeys } from '@/consts/factory/upvote';
import PostComment from './post-comment';
import { useToggleBookmark } from '@/hooks/mutate/bookmark/use-toggle-bookmark';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useBookmarkListing } from '@/hooks/query/bookmark/use-bookmark-listing';
import { bookmarkKeys } from '@/consts/factory/bookmark';
import { PATHS } from '@/utils/paths';
import { usePostDownload } from '@/hooks/query/post/use-post-download';
import ToggleTruncateTextTypography from './toggle-truncate-text-typography';
import { DOWNLOAD_POINT } from '@/consts/common';
import { useGetWalletByAccount } from '@/hooks/query/wallet/use-get-wallet-by-account';
import { OnAction } from '@/types';

const { confirm } = Modal;

interface PostItemProps {
    data: Post;
    showActions?: boolean;
    showCheckbox?: boolean;
    field?: FormListFieldData;
    showLike?: boolean;
    extra?: React.ReactNode;
    showComment?: boolean;
    showDetail?: boolean;
    showPublic?: boolean;
    onClick?: OnAction;
    hideComment?: boolean;
}

export const useDownloadZip = (data: string, fileName: string, extension: string) => {
    useEffect(() => {
        if (data) {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([data], { type: 'application/gzip;charset=utf-8' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.${extension}`);

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link!.parentNode!.removeChild(link);
        }
    }, [data]);
};

export function getFileNameFromUrl(url: string) {
    // validate url is valid (check with regex)
    if (
        !url ||
        !url.match(/((https?|ftp|file):\/\/)?(www\.)?([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)+([a-zA-Z0-9\?=_-]+)?/g)
    ) {
        return '';
    }

    // Create a URL object
    const urlObj = new URL(url);

    // Get the pathname from the URL object
    const pathname = urlObj.pathname;

    // Extract the file name from the pathname
    const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);

    // Decode the file name to handle URL encoded characters
    return decodeURIComponent(fileName)?.split('/')[1];
}

export const PostItem: FC<PostItemProps> = ({
    data,
    showActions = true,
    showCheckbox = false,
    showLike = true,
    field,
    extra,
    showComment = false,
    showDetail = true,
    showPublic = true,
    hideComment = false,
    onClick,
}) => {
    if (!data) {
        return null;
    }

    const { title, content, createdDate, imageList, tag, postId, topic, linkFile } = data;

    const { id } = useParams();
    const navigate = useNavigate();
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { success, error } = useMessage();
    const location = useLocation();

    const [searchParams] = useSearchParams();

    const [expandable, setExpandable] = useState(false);
    const [isShowComment, setIsShowComment] = useState(showComment);
    const [downloadPostId, setDownloadPostId] = useState<string | null>(null);

    const { data: wallet, isLoading } = useGetWalletByAccount(accountInfo?.accountId as string);
    const { data: upvotes } = useUpvoteListing();
    const { data: bookmarks } = useBookmarkListing();
    const { mutate: toggleBookmark, isPending: isPendingToggleBookmark } = useToggleBookmark();
    const { mutate: upvote, isPending: isPendingUpvote } = useToggleUpvote();
    const {
        trigger: download,
        data: downloadData,
        isSuccess: isSuccessDownload,
        isError: isErrorDownload,
        error: errorDownload,
        isPending: isPendingDownload,
        isLoading: isLoadingDownload,
    } = usePostDownload(downloadPostId as string);
    const { mutate: deletePost, isPending: isPendingDeletePost } = useDeletePost(postId, {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: postKeys.listing(),
            });
            success('Post deleted successfully!');
        },
        onError: err => {
            error(err?.message ?? 'Failed to delete post');
        },
    });

    const { mutate: deletePostDraft, isPending: isPendingDeletePostDraft } = useDeleteDraftPost();

    const handleUpdate = () => {
        dispatch(setPost({ modal: { open: true, type: 'update' }, id: postId }));
    };

    const handleDelete = () => {
        confirm({
            title: 'Are you sure you want to delete this post?',
            content: 'This action cannot be undone',
            onOk() {
                location.pathname.includes('draft')
                    ? deletePostDraft([data?.postId], {
                          onSuccess: () => {
                              queryClient.invalidateQueries({
                                  queryKey: postKeys.drafts(),
                              });
                              success('Post deleted successfully!');
                              dispatch(setPost({ modal: { open: false, type: 'draft' } }));
                              navigate(-1)
                          },
                          onError: err => {
                              error(err?.message ?? 'Failed to delete post');
                          },
                      })
                    : deletePost();
            },
            okButtonProps: {
                disabled: isPendingDeletePost,
            },
        });
    };

    const handleReport = () => {
        dispatch(setPost({ modal: { open: true, type: 'report' }, id: postId }));
    };

    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`);
        success('Link copied to clipboard!');
    };

    const handleUpvote = (id: string) => {
        upvote(id, {
            onSuccess: () => {
              
            },
        });
    };

    const handleBookmark = (id: string) => {
        toggleBookmark(
            { postId: id },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: bookmarkKeys.listing(),
                    });
                },
            },
        );
    };

    const handleComment = () => {
        setIsShowComment(!isShowComment);
    };

    const isAllowShowActions =
        accountInfo?.role?.name === 'ADMIN' ||
        accountInfo?.role?.name === 'STAFF' ||
        data?.account?.accountId === accountInfo?.accountId;
    const isAllowShowReport =
        accountInfo?.role?.name === 'ADMIN' ||
        accountInfo?.role?.name === 'STAFF' ||
        data?.account?.accountId !== accountInfo?.accountId;

    // useDownloadZip(downloadData?.entity, postId, 'zip');

    useEffect(() => {
        if (isSuccessDownload) {
            window.open(data?.postFileList?.[0]?.url, '_blank');
            setDownloadPostId(null);
        }
    }, [isSuccessDownload]);

    useEffect(() => {
        if (isErrorDownload) {
            error(errorDownload?.message);
        }
    }, [isErrorDownload, errorDownload]);

    return (
        <Card
            style={{ cursor: 'pointer' }}
            onClick={() => onClick ? onClick() : navigate(PATHS.POST_DETAIL.replace(':id', data?.postId))}
        >
            <Flex vertical gap={8}>
                <Flex justify="space-between" align="flex-start">
                    <Flex align="center" gap={8}>
                        <UserInfo account={data.account} />
                        {topic && (
                            <Tag
                                style={{
                                    padding: '0 10px',
                                    fontSize: 16,
                                    height: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                {topic?.name}
                            </Tag>
                        )}
                        {tag && (
                            <PostTag backgroundColor={tag?.backgroundColorHex} textColor={tag?.textColorHex}>
                                <TagOutlined style={{ marginRight: 8 }} />
                                {tag?.name}
                            </PostTag>
                        )}
                    </Flex>
                    <Flex align="center" gap={8}>
                        {showActions && isAllowShowActions && (
                            <Dropdown
                                menu={{
                                    items: [
                                        ...(showPublic
                                            ? [
                                                  {
                                                      key: '1',
                                                      icon: <GlobalOutlined />,
                                                      label: <span>Public</span>,
                                                      children: [
                                                          {
                                                              key: '1.1',
                                                              icon: <GlobalOutlined />,
                                                              label: <span>Public</span>,
                                                          },
                                                          {
                                                              key: '1.2',
                                                              icon: <KeyOutlined />,
                                                              label: <span>Private</span>,
                                                          },
                                                          {
                                                              key: '1.3',
                                                              icon: <EyeInvisibleOutlined />,
                                                              label: <span>Hide</span>,
                                                          },
                                                      ],
                                                  },
                                              ]
                                            : []),
                                        {
                                            key: '2',
                                            icon: <EditOutlined />,
                                            label: <span>Edit post</span>,
                                            onClick: e => {
                                                e.domEvent.stopPropagation();
                                                handleUpdate();
                                            },
                                        },
                                        {
                                            key: '3',
                                            icon: <DeleteOutlined />,
                                            label: <span>Delete post</span>,
                                            onClick: e => {
                                                e.domEvent.stopPropagation();
                                                handleDelete();
                                            },
                                        },
                                        // {
                                        //     key: '4',
                                        //     icon: <DownloadOutlined />,
                                        //     label: (
                                        //         <a href={data?.postFileList?.[0]?.url} download>
                                        //             Download
                                        //         </a>
                                        //     ),
                                        //     disabled: !data?.postFileList?.[0]?.url,
                                        //     onClick: e => {
                                        //         e.domEvent.stopPropagation();
                                        //         setDownloadPostId(postId);
                                        //         download();
                                        //     },
                                        // },
                                    ],
                                }}
                            >
                                <Button
                                    onClick={e => e.stopPropagation()}
                                    type="text"
                                    icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
                                />
                            </Dropdown>
                        )}
                        {/* {!id && showDetail && (
                            <IconButton
                                icon={<EyeOutlined />}
                                children=""
                                onClick={() => navigate(PATHS.POST_DETAIL.replace(':id', data?.postId))}
                            />
                        )} */}
                        {showCheckbox && field && (
                            <Form.Item name={[field.name, 'checked']} valuePropName="checked">
                                <Checkbox onClick={e => e.stopPropagation()} />
                            </Form.Item>
                        )}
                    </Flex>

                    {extra && extra}
                </Flex>

                <Typography.Title
                    level={4}
                    style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    {title}
                </Typography.Title>

                <ToggleTruncateTextTypography content={content} maxLength={200} />

                <Flex gap={10} wrap onClick={e => e.stopPropagation()}>
                    {imageList?.map(file => (
                        <div className="ant-upload" key={file.imageId} onClick={e => e.stopPropagation()}>
                            <Image src={file.url} alt={file.url} onClick={e => e.stopPropagation()} />
                        </div>
                    ))}
                </Flex>

                <Spin spinning={isLoadingDownload} size="small">
                    <Flex
                        gap={8}
                        onClick={e => {
                            e.stopPropagation();
                        }}
                        style={{
                            color: '#007AFF',
                        }}
                    >
                        {getFileNameFromUrl(data?.postFileList?.[0]?.url) && <FileZipOutlined />}
                        <Typography.Link
                            onClick={e => {
                                e.stopPropagation();
                                confirm({
                                    title: 'Confirm',
                                    content: (
                                        <>
                                            <Typography.Text type="secondary">
                                                Do you want to download this file?
                                            </Typography.Text>
                                            <Flex vertical align="center">
                                                <Typography.Title
                                                    level={3}
                                                    color="#FF6934"
                                                    style={{
                                                        color: '#FF6934',
                                                        marginTop: 24,
                                                    }}
                                                >
                                                    -{DOWNLOAD_POINT} MC
                                                </Typography.Title>
                                            </Flex>
                                            <Divider />
                                            <Flex justify="space-between">
                                                <Typography.Title level={4}>Balance:</Typography.Title>
                                                <Typography.Title level={4}>{wallet?.balance} MC</Typography.Title>
                                            </Flex>
                                            <Flex justify="space-between">
                                                <Typography.Title
                                                    level={4}
                                                    style={{
                                                        color:
                                                            (wallet?.balance || 0) - (DOWNLOAD_POINT || 0) < 0
                                                                ? 'red'
                                                                : 'black',
                                                    }}
                                                >
                                                    Remaining:
                                                </Typography.Title>
                                                <Typography.Title
                                                    level={4}
                                                    style={{
                                                        color:
                                                            (wallet?.balance || 0) - (DOWNLOAD_POINT || 0) < 0
                                                                ? 'red'
                                                                : 'black',
                                                    }}
                                                >
                                                    {(wallet?.balance || 0) - (DOWNLOAD_POINT || 0)} MC
                                                </Typography.Title>
                                            </Flex>
                                            <Divider />
                                        </>
                                    ),
                                    onOk: () => {
                                        setDownloadPostId(postId);
                                        download();
                                    },
                                });
                            }}
                            style={{
                                color: '#007AFF',
                            }}
                        >
                            {getFileNameFromUrl(data?.postFileList?.[0]?.url)}
                        </Typography.Link>
                    </Flex>
                </Spin>

                <Typography.Text type="secondary" onClick={e => e.stopPropagation()}>
                    Posted {dayjsConfig(createdDate).fromNow()}
                </Typography.Text>

                <Flex gap={32} vertical onClick={e => e.stopPropagation()}>
                    {showLike && (
                        <Flex justify="end" gap={20}>
                            <IconButton
                                icon={
                                    !upvotes?.find(
                                        upvote =>
                                            upvote?.post?.postId === data?.postId &&
                                            upvote?.account?.accountId === accountInfo?.accountId,
                                    ) ? (
                                        <LikeOutlined />
                                    ) : (
                                        <LikeFilled
                                            color="#007AFF"
                                            style={{
                                                color: '#007AFF',
                                            }}
                                        />
                                    )
                                }
                                children={
                                    <Typography.Text
                                        style={{
                                            color: !upvotes?.find(
                                                upvote =>
                                                    upvote?.post?.postId === data?.postId &&
                                                    upvote?.account?.accountId === accountInfo?.accountId,
                                            )
                                                ? 'unset'
                                                : '#007AFF',
                                        }}
                                    >
                                        {data?.upvoteCount} {data?.upvoteCount > 1 ? 'Likes' : 'Like'}
                                    </Typography.Text>
                                }
                                onClick={() => handleUpvote(data?.postId)}
                                disabled={isPendingUpvote}
                            />
                            <IconButton
                                icon={<CommentOutlined />}
                                children={
                                    <Typography.Text>
                                        {data?.commentCount} {data?.commentCount > 1 ? 'Comments' : 'Comment'}
                                    </Typography.Text>
                                }
                                onClick={handleComment}
                            />
                            <IconButton icon={<ShareAltOutlined />} children="Share" onClick={copyLink} />
                            {bookmarks?.find(bookmark => bookmark?.postId === data?.postId) ? (
                                <IconButton
                                    icon={
                                        <FaBookmark
                                            style={{
                                                color: '#EEA956',
                                            }}
                                        />
                                    }
                                    children="Bookmark"
                                    onClick={() => handleBookmark(data?.postId)}
                                    disabled={isPendingToggleBookmark}
                                />
                            ) : (
                                <IconButton
                                    icon={<FaRegBookmark />}
                                    children="Bookmark"
                                    onClick={() => handleBookmark(data?.postId)}
                                    disabled={isPendingToggleBookmark}
                                />
                            )}
                            {isAllowShowReport && (
                                <IconButton
                                    icon={<ExclamationCircleOutlined />}
                                    children="Report"
                                    onClick={handleReport}
                                />
                            )}
                        </Flex>
                    )}

                    {isShowComment && !hideComment && <PostComment postId={data?.postId} isShown={isShowComment} />}
                </Flex>
            </Flex>
        </Card>
    );
};
