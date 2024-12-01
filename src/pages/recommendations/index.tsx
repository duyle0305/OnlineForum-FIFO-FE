import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { useGetFollows } from '@/hooks/query/follow/use-follow-listing';
import { useGetFollowTopAccounts, useGetRecommendations } from '@/hooks/query/follow/use-follow-top-accounts';
import { Card, Divider, Empty, Flex, Typography } from 'antd';
import React from 'react';
import { RecommendedItem } from '../home/components/recommended-item';
import { EventsWrapper } from '../home/layout/events-wrapper';

const RecommendationsPage = () => {
    const { data: topAccounts } = useGetRecommendations();
    const { data: follows } = useGetFollows();

    return (
        <Card>
            <PageBreadcrumbs />
            <Divider />
            <Flex vertical gap={20}>
                <Typography.Title level={4}>Suggested for you</Typography.Title>
                <EventsWrapper>
                    {topAccounts?.length ? (
                        topAccounts?.map(account => (
                            <RecommendedItem key={account?.account?.accountId} account={account?.account} follows={follows} />
                        ))
                    ) : (
                        <Empty description="No recommendation" />
                    )}
                </EventsWrapper>
            </Flex>
        </Card>
    );
};

export default RecommendationsPage;
