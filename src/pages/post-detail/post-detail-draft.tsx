import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { PostItem } from '@/components/post/post-item';
import { useGetPost } from '@/hooks/query/post/use-get-post';
import { RootState } from '@/stores';
import { PostModalType, setPost } from '@/stores/post';
import { Button, Card, Divider, Flex, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReportReason from '../user-profile/components/report-reason';
import { ReportAccountReasons, reportAccountReasons } from '@/types/report/report';
import { useMessage } from '@/hooks/use-message';
import { useCreateReportPost } from '@/hooks/mutate/report/use-create-report';
import { UpdatePost } from '../post/components/update-post';
import { PATHS } from '@/utils/paths';
import { UpdatePostDraft } from '../post/components/update-post-draft';

const PostDetailDraftPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state.post);

    const { success } = useMessage();

    const { data } = useGetPost(id || '');

    const [selectedReason, setSelectedReason] = useState<ReportAccountReasons>();

    const { mutate: createReport, isPending: isPendingCreateReport } = useCreateReportPost(id || '');

    const handleCancel = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: false, type } }));
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
        <Flex vertical gap={20}>
            <Card>
                <PageBreadcrumbs title="Drafts" />
                <Divider />
            </Card>
            {data && (
                <PostItem
                    data={data}
                    showComment={false}
                    showPublic={false}
                    onClick={() => navigate(`${PATHS.POST_DETAIL_DRAFT.replace(':id', data?.postId)}`)}
                    showLike={false}
                    hideComment={true}
                />
            )}
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

            <UpdatePostDraft onCancel={() => handleCancel('update')} />
        </Flex>
    );
};

export default PostDetailDraftPage;
