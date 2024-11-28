import { Button, Empty, Flex, Form, Modal, TabsProps } from 'antd';
import { ProfileInfo } from './components/profile-info';
import { BaseTab } from '@/components/core/tab';
import { PostItem } from '@/components/post/post-item';
import { Medias } from './components/medias';
import { PostWrapper } from '../post/layout/post-wrapper';
import { PaginationParams } from '@/types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { RootState } from '@/stores';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { ReportAccountReasons, reportAccountReasons } from '@/types/report/report';
import ReportReason from './components/report-reason';
import { useCreateReport } from '@/hooks/mutate/report/use-create-report';
import { useMessage } from '@/hooks/use-message';
import { useParams } from 'react-router-dom';
import { PostStatus } from '@/types/post/post';

const UserProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedReason, setSelectedReason] = useState<ReportAccountReasons>();
    const [isShowReportReasons, setIsShowReportReasons] = useState(false);

    const { accountInfo } = useSelector((state: RootState) => state.account);
    const { success, error } = useMessage();

    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const { data } = usePostsListing({
        params: {
            ...initialParams,
            accountId: id || accountInfo?.accountId,
            statuses: [PostStatus.PUBLIC],
        },
    });

    if (!accountInfo) {
        return null;
    }

    const { mutate: createReport, isPending: isPendingCreateReport } = useCreateReport(id as string);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Posts',
            children: (
                <PostWrapper showHeader={false}>
                    {!data || !data.length ? <Empty /> : data.map(post => <PostItem data={post} key={post.postId} />)}
                </PostWrapper>
            ),
        },
        {
            key: '2',
            label: 'Replies',
            children: <div></div>,
        },
        {
            key: '3',
            label: 'Media',
            children: <Medias />,
        },
    ];

    const handleReportAccount = () => {
        if (!selectedReason) {
            return;
        }

        createReport(selectedReason, {
            onSuccess: () => {
                success('Reported successfully!');
                setIsShowReportReasons(false);
            },
            onError: err => {
                error(err.message);
            },
        });
    };

    return (
        <div>
            <ProfileInfo setIsShowReportReasons={setIsShowReportReasons} />
            <BaseTab items={items} defaultActiveKey="1" />

            <Modal
                title="Report"
                open={isShowReportReasons}
                onCancel={() => setIsShowReportReasons(false)}
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
        </div>
    );
};

export default UserProfilePage;
