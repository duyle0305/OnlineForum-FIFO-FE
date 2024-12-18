import { SecondaryButton } from '@/components/core/secondary-button';
import { Avatar, Button, Card, Divider, Dropdown, Flex, Input, Modal, Space, Tag } from 'antd';
import React, { FC, useState } from 'react';
import { CreatePost } from '../components/create-post';
import { CaretDownFilled } from '@ant-design/icons';
import { TagListingParams, useTagsListing } from '@/hooks/query/tag/use-tags-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { useDispatch } from 'react-redux';
import { PostModalType, setPost } from '@/stores/post';
import { useSearchParams } from 'react-router-dom';
import { UpdatePost } from '../components/update-post';
import DraftList from '../components/draft-list';
import { useTopicsListing } from '@/hooks/query/topic/use-topics-listing';
import { ReportAccountReasons, reportAccountReasons } from '@/types/report/report';
import { useCreateReportPost } from '@/hooks/mutate/report/use-create-report';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useMessage } from '@/hooks/use-message';
import ReportReason from '@/pages/user-profile/components/report-reason';
import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { useCategoriesListing } from '@/hooks/query/category/use-category-listing';

interface PostWrapperProps {
    children: React.ReactNode;
    showHeader?: boolean;
}

const initialParams: TagListingParams = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
};

export const PostWrapper: FC<PostWrapperProps> = ({ children, showHeader = true }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { type, open } = useSelector((state: RootState) => state.post.modal);

    const topicId = searchParams.get('topicId') || undefined;
    const tagId = searchParams.get('tagId') || undefined;
    const categoryId = searchParams.get('category') || undefined;

    const { success } = useMessage();
    const dispatch = useDispatch();
    const { id, modal } = useSelector((state: RootState) => state.post);

    const [openDraft, setOpenDraft] = useState<boolean>(false);
    const [selectedReason, setSelectedReason] = useState<ReportAccountReasons>();
    const { data: categories } = useCategoriesListing({ params: initialParams });

    const { mutate: createReport, isPending: isPendingCreateReport } = useCreateReportPost(id || '');
    const { data: topics } = useTopicsListing({
        params: {
            ...initialParams,
            ...(categoryId && { categoryId }),
        },
    });
    const { data: tagsData, isLoading: loadingTags } = useTagsListing({ params: initialParams });

    const handleCancel = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: false, type } }));
    };

    const handleOpen = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: true, type } }));
    };

    const handleSelectTag = (id: string | undefined) => {
        setSearchParams(params => ({
            ...params,
            ...(categoryId && { category: categoryId }),
            ...(topicId && { topicId }),
            ...(id && { tagId: id }),
        }));
    };

    const handleSelectTopic = (id: string | undefined) => {
        setSearchParams(params => ({
            ...params,
            ...(categoryId && { category: categoryId }),
            topicId: id,
            ...(tagId && { tagId }),
        }));
    };

    const handleReportAccount = () => {
        if (!selectedReason) {
            return;
        }

        createReport(selectedReason, {
            onSuccess: () => {
                success('Reported successfully!');
                setSelectedReason(undefined);
                dispatch(setPost({ modal: { open: false, type: 'report' } }));
            },
        });
    };

    return (
        <Flex vertical gap={10}>
            {showHeader && (
                <>
                    <Card>
                        <PageBreadcrumbs
                            title={
                                categories?.find(category => category.categoryId === searchParams.get('category'))?.name
                            }
                        />

                        <Divider />

                        <Flex gap={10} style={{ width: '100%' }} align="center">
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: '1',
                                            label: (
                                                <Space align="center">
                                                    <Tag
                                                        style={{
                                                            minHeight: 32,
                                                            minWidth: 100,
                                                            fontSize: 14,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        All
                                                    </Tag>
                                                </Space>
                                            ),
                                            onClick: () => handleSelectTag(undefined),
                                        },
                                        ...(tagsData?.map(tag => ({
                                            key: tag.tagId,
                                            label: (
                                                <Space align="center">
                                                    <Tag
                                                        style={{
                                                            minHeight: 32,
                                                            minWidth: 100,
                                                            fontSize: 14,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: tag.backgroundColorHex,
                                                            color: tag.textColorHex,
                                                        }}
                                                    >
                                                        {tag.name}
                                                    </Tag>
                                                </Space>
                                            ),
                                            onClick: () => handleSelectTag(tag.tagId),
                                        })) || []),
                                    ],
                                    selectedKeys: [tagId || '1'],
                                }}
                            >
                                <SecondaryButton icon={<CaretDownFilled />} loading={loadingTags}>
                                    Tags
                                </SecondaryButton>
                            </Dropdown>
                            <Flex gap={6} flex={1} align="center">
                                <Avatar
                                    size={48}
                                    shape="circle"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <Input
                                    size="large"
                                    placeholder="Let's share what going on your mind..."
                                    onClick={() => handleOpen('create')}
                                    readOnly
                                />
                                <SecondaryButton onClick={() => handleOpen('create')}>Create Post</SecondaryButton>
                            </Flex>
                        </Flex>
                    </Card>

                    <Divider />

                    <Flex gap={10} align="center" wrap>
                        {topics?.map(topic => (
                            <Tag
                                key={topic.topicId}
                                style={{
                                    fontSize: 14,
                                    minHeight: 32,
                                    minWidth: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    ...(topic.topicId === topicId && { backgroundColor: '#f0f0f0', color: '#000' }),
                                }}
                                onClick={() => handleSelectTopic(topic.topicId)}
                            >
                                {topic.name}
                            </Tag>
                        ))}
                    </Flex>

                    <Divider />
                </>
            )}

            <Flex vertical gap={20}>
                {children}
            </Flex>

            <CreatePost onCancel={() => handleCancel('create')} />

            <UpdatePost onCancel={() => handleCancel('update')} />

            {type === 'draft' && open && <DraftList onCancel={() => handleCancel('draft')} />}

            <Modal
                title="Report"
                open={modal.open && modal.type === 'report'}
                onCancel={() => handleCancel('report')}
                footer={null}
            >
                {reportAccountReasons.map((reason, index) => (
                    <ReportReason
                        key={index}
                        reason={reason}
                        selectedReason={selectedReason}
                        setSelectedReason={setSelectedReason}
                    />
                ))}

                <Flex justify="center">
                    <Button
                        type="primary"
                        onClick={handleReportAccount}
                        loading={isPendingCreateReport}
                        disabled={!selectedReason}
                    >
                        Submit
                    </Button>
                </Flex>
            </Modal>
        </Flex>
    );
};
