import React from 'react'
import AdminFeedbackWrapper from '../feedback/layout/admin-feedback-wrapper';
import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import AdminReportList from './components/admin-report-list';
import { TabsProps } from 'antd';
import { BaseTab } from '@/components/core/tab';
import AdminAccountReportList from './components/admin-account-report-list';

const AdminReportPage = () => {
      const items: TabsProps['items'] = [
          {
              key: '1',
              label: 'Post',
              children: <AdminReportList />,
          },
          {
              key: '2',
              label: 'Account',
              children: <AdminAccountReportList />,
          },
      ];

  return (
      <AdminFeedbackWrapper>
          <PageBreadcrumbs />
          
          <BaseTab items={items} defaultActiveKey="1" />
      </AdminFeedbackWrapper>
  );
}

export default AdminReportPage