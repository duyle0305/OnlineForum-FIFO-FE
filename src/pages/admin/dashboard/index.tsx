import { useStatistics } from '@/hooks/query/user/use-user-listing';
import { Card, Col, Flex, Row, Statistic } from 'antd';
import React from 'react';
import AdminUserPage from '../user';
import TransactionList from '@/pages/wallet/components/transaction-list';

const AdminDashboardPage = () => {
    const { data, isFetching } = useStatistics();

    return (
        <Flex vertical gap={20}>
            <Card title="Dashboard">
                <Row gutter={16}>
                    <Col span={6}>
                        <div
                            style={{
                                backgroundColor: '#2C353D',
                                padding: 24,
                                borderRadius: 16,
                            }}
                        >
                            <Statistic title="Total Amount" value={data?.accountAmount} />
                            <p>
                                <span
                                    style={{
                                        color: '#18C07A',
                                    }}
                                >
                                    {data?.accountGrowthRate}%
                                </span>{' '}
                                Up from yesterday
                            </p>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div
                            style={{
                                backgroundColor: '#2C353D',
                                padding: 24,
                                borderRadius: 16,
                            }}
                        >
                            <Statistic title="Total Post" value={data?.postAmount} />
                            <p>
                                <span
                                    style={{
                                        color: '#18C07A',
                                    }}
                                >
                                    {data?.postGrowthRate}%
                                </span>{' '}
                                Up from yesterday
                            </p>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div
                            style={{
                                backgroundColor: '#2C353D',
                                padding: 24,
                                borderRadius: 16,
                            }}
                        >
                            <Statistic title="Total Activity" value={data?.activityAmount} />
                            <p>
                                <span
                                    style={{
                                        color: '#18C07A',
                                    }}
                                >
                                    {data?.activityGrowthRate}%
                                </span>{' '}
                                Up from yesterday
                            </p>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div
                            style={{
                                backgroundColor: '#2C353D',
                                padding: 24,
                                borderRadius: 16,
                            }}
                        >
                            <Statistic title="Total Deposit" value={data?.depositAmount} />
                            <p>
                                <span
                                    style={{
                                        color: '#18C07A',
                                    }}
                                >
                                    {data?.depositGrowthRate}%
                                </span>{' '}
                                Up from yesterday
                            </p>
                        </div>
                    </Col>
                </Row>
            </Card>

            <AdminUserPage />

            <Card title="Transaction">
                <TransactionList />
            </Card>
        </Flex>
    );
};

export default AdminDashboardPage;
