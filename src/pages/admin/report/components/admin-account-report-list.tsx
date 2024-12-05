import { useFeedbackListing } from '@/hooks/query/feedback/use-feedback-listing';
import { Empty } from 'antd';
import React from 'react';
import AdminFeedbackWrapper from '../../feedback/layout/admin-feedback-wrapper';
import AdminFeedbackItem from '../../feedback/components/admin-feedback-item';
import { useReportAccountListing, useReportPostsListing } from '@/hooks/query/report/use-report-posts';
import AdminReportItem from './admin-report-item';
import AdminAccountReportItem from './admin-account-report-item';

const AdminAccountReportList = () => {
    const { data: reportPosts } = useReportAccountListing();

    if (!reportPosts || !reportPosts.length) {
        return <Empty />;
    }

    return (
        <AdminFeedbackWrapper>
            {reportPosts.map(reportPost => (
                <AdminAccountReportItem key={reportPost.reportAccountId} data={reportPost} />
            ))}
        </AdminFeedbackWrapper>
    );
};

export default AdminAccountReportList;
