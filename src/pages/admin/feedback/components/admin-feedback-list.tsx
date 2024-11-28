import { useFeedbackListing } from '@/hooks/query/feedback/use-feedback-listing';
import { Empty } from 'antd';
import React from 'react';
import AdminFeedbackWrapper from '../layout/admin-feedback-wrapper';
import AdminFeedbackItem from './admin-feedback-item';

const AdminFeedbackList = () => {
    const { data: feedbacks } = useFeedbackListing();

    if (!feedbacks || !feedbacks.length) {
        return <Empty />;
    }

    return (
        <AdminFeedbackWrapper>
            {feedbacks.map(feedback => (
                <AdminFeedbackItem key={feedback.feedbackId} data={feedback} />
            ))}
        </AdminFeedbackWrapper>
    );
};

export default AdminFeedbackList;
