import { Card } from 'antd';
import React, { FC } from 'react';

import PageBreadcrumbs from '@/components/core/page-breadcrumbs';

interface FeedbackWrapperProps {
    children: React.ReactNode;
}

const FeedbackWrapper: FC<FeedbackWrapperProps> = ({ children }) => {
    return (
        <Card>
            <PageBreadcrumbs />

            {children}
        </Card>
    );
};

export default FeedbackWrapper;
