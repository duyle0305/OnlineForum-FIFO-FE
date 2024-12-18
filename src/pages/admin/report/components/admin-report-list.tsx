import { Button, Checkbox, Dropdown, Empty, Flex, GetProp, Input, Modal, Popover, Tag, Typography } from 'antd';
import React, { useEffect } from 'react';
import AdminFeedbackWrapper from '../../feedback/layout/admin-feedback-wrapper';
import { PostReportParams, useReportPostsListing } from '@/hooks/query/report/use-report-posts';
import AdminReportItem from './admin-report-item';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { DeleteOutlined, EllipsisOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { mapFeedbackStatusColor } from '../../feedback/utils/map-feedback-status-color';
import { FeedbackStatus } from '@/types/feedback/feedback';
import { useDebounce } from '@/hooks/use-debounce';
import { useGetPost } from '@/hooks/query/post/use-get-post';
import { PostItem } from '@/components/post/post-item';
import { PostReport } from '@/types/report/report';
import { useUpdatePostReport } from '@/hooks/mutate/report/use-update-post-report';
import { useQueryClient } from '@tanstack/react-query';
import { useMessage } from '@/hooks/use-message';
import { reportKeys } from '@/consts/factory/report';
import { useDeletePost } from '@/hooks/mutate/post/use-delete-post';
import { IoIosRefresh } from 'react-icons/io';

const { confirm } = Modal;

const AdminReportList = () => {
    const initialParams: PostReportParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
    const [params, setParams] = React.useState<PostReportParams>(initialParams);
    const [search, setSearch] = React.useState<string>('');
    const [postId, setPostId] = React.useState<string | null>(null);
    const [report, setReport] = React.useState<PostReport | null>(null);

    const queryClient = useQueryClient();
    const { success } = useMessage();

    const searchDebounce = useDebounce(search, 500);

    const { data: detail } = useGetPost(postId ?? '');

    useEffect(() => {
        setParams({
            ...params,
            username: searchDebounce,
            page: DEFAULT_PAGE,
        });
    }, [searchDebounce]);

    const { data: reportPosts, error } = useReportPostsListing({
        params,
    });

    const { mutate: updatePostReport } = useUpdatePostReport(report?.reportId as string, {
        onSuccess: () => {
            success('Report updated successfully!');
            setPostId(null);
            setReport(null);
            queryClient.invalidateQueries({
                queryKey: reportKeys.reportPostListing(params),
            });
        },
    });

    const { mutate: deletePost, isPending: isPendingDeletePost } = useDeletePost(postId ?? '', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: reportKeys.reportPostListing(),
            });
            success('Post deleted successfully!');
        },
    });

    const handleDelete = () => {
        confirm({
            title: 'Are you sure you want to delete this post?',
            content: 'This action cannot be undone',
            onOk() {
                deletePost();
            },
            okButtonProps: {
                disabled: isPendingDeletePost,
            },
        });
    };

    const optionsWithDisabled = [
        {
            label: (
                <Tag
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 24,
                        fontSize: 12,
                    }}
                    color={mapFeedbackStatusColor('PENDING')}
                >
                    PENDING
                </Tag>
            ),
            value: 'PENDING',
        },
        {
            label: (
                <Tag
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 24,
                        fontSize: 12,
                    }}
                    color={mapFeedbackStatusColor('REJECTED')}
                >
                    REJECTED
                </Tag>
            ),
            value: 'REJECTED',
        },
        {
            label: (
                <Tag
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 24,
                        fontSize: 12,
                    }}
                    color={mapFeedbackStatusColor('APPROVED')}
                >
                    APPROVED
                </Tag>
            ),
            value: 'APPROVED',
        },
    ];

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
        setSelectedStatus(checkedValues as string[]);
    };

    const content = (
        <Flex vertical justify="center" align="center" gap={12}>
            <Typography.Title level={5}>STATUS</Typography.Title>
            <Checkbox.Group onChange={onChange}>
                <Flex vertical gap={8}>
                    {optionsWithDisabled.map(option => (
                        <Checkbox key={option.value} value={option.value}>
                            {option.label}
                        </Checkbox>
                    ))}
                </Flex>
            </Checkbox.Group>

            <Button
                type="primary"
                onClick={() =>
                    setParams({
                        ...params,
                        reportPostStatusList: selectedStatus as FeedbackStatus[],
                        page: DEFAULT_PAGE,
                    })
                }
            >
                Apply
            </Button>
        </Flex>
    );

    return (
        <AdminFeedbackWrapper>
            <Flex justify="space-between">
                <div
                    style={{
                        position: 'relative',
                        minWidth: 360,
                    }}
                >
                    <Input
                        style={{
                            paddingLeft: 32,
                        }}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <SearchOutlined
                    style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                    }}
                />

                <Flex gap={8}>
                    <Popover content={content} trigger="click" arrow={false}>
                        <Button icon={<FilterOutlined />}>Filter</Button>
                    </Popover>

                    <Button
                        icon={<IoIosRefresh />}
                        onClick={() =>
                            queryClient.invalidateQueries({
                                queryKey: reportKeys.reportPostListing(params),
                            })
                        }
                    />
                </Flex>
            </Flex>

            {reportPosts ? (
                reportPosts.map(reportPost => (
                    <AdminReportItem
                        key={reportPost.reportId}
                        data={reportPost}
                        setPostId={setPostId}
                        setReport={setReport}
                    />
                ))
            ) : (
                <Empty />
            )}

            {detail && (
                <Modal
                    title="Reported Post"
                    open={!!postId}
                    onCancel={() => {
                        setPostId(null);
                    }}
                    footer={null}
                    width="80vw"
                >
                    <PostItem
                        onClick={() => {}}
                        data={detail}
                        showActions={false}
                        showLike={false}
                        extra={
                            <>
                                <Flex gap={4} align="center">
                                    <Tag
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 24,
                                            fontSize: 12,
                                        }}
                                        color={mapFeedbackStatusColor(report?.status as FeedbackStatus)}
                                    >
                                        {report?.status}
                                    </Tag>

                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: '1',
                                                    label: (
                                                        <Tag
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                height: 24,
                                                                fontSize: 12,
                                                            }}
                                                            color={mapFeedbackStatusColor('APPROVED')}
                                                        >
                                                            APPROVED
                                                        </Tag>
                                                    ),
                                                    onClick: e => {
                                                        e.domEvent.stopPropagation();
                                                        updatePostReport('APPROVED');
                                                    },
                                                    disabled: report?.status !== 'PENDING',
                                                },
                                                {
                                                    key: '2',
                                                    label: (
                                                        <Tag
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                height: 24,
                                                                fontSize: 12,
                                                            }}
                                                            color={mapFeedbackStatusColor('REJECTED')}
                                                        >
                                                            REJECTED
                                                        </Tag>
                                                    ),
                                                    onClick: e => {
                                                        e.domEvent.stopPropagation();
                                                        updatePostReport('REJECTED');
                                                    },
                                                    disabled: report?.status !== 'PENDING',
                                                },
                                                // {
                                                //     key: '3',
                                                //     icon: <DeleteOutlined />,
                                                //     label: <span>Delete post</span>,
                                                //     onClick: handleDelete,
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
                                </Flex>
                            </>
                        }
                    />
                </Modal>
            )}
        </AdminFeedbackWrapper>
    );
};

export default AdminReportList;
