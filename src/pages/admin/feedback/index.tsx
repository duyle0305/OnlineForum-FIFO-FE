import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import React from 'react';
import AdminFeedbackWrapper from './layout/admin-feedback-wrapper';
import AdminFeedbackItem from './components/admin-feedback-item';
import AdminFeedbackList from './components/admin-feedback-list';

const AdminFeedbackPage = () => {
    return (
        <AdminFeedbackWrapper>
            <PageBreadcrumbs />

            <AdminFeedbackList />
        </AdminFeedbackWrapper>
    );
};

export default AdminFeedbackPage;
