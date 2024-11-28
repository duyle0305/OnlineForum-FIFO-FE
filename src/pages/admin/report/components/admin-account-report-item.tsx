import { UserInfo } from '@/components/user/user-info';
import { FULL_TIME_FORMAT } from '@/consts/common';
import { RootState } from '@/stores';
import { Feedback } from '@/types/feedback/feedback';
import dayjsConfig from '@/utils/dayjs';
import { Button, Card, Divider, Dropdown, Flex, Space, Tag, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { useUpdateFeedback } from '@/hooks/mutate/feedback/use-update-feedback';
import { useMessage } from '@/hooks/use-message';
import { useQueryClient } from '@tanstack/react-query';
import { feedbackKeys } from '@/consts/factory/feedback';
import { mapFeedbackStatusColor } from '../../feedback/utils/map-feedback-status-color';
import { AccountReport, PostReport } from '@/types/report/report';
import { useUpdatePostReport } from '@/hooks/mutate/report/use-update-post-report';
import { reportKeys } from '@/consts/factory/report';
import { useUpdateReportAccount } from '@/hooks/mutate/report/use-update-report-account';

interface AdminAccountReportItemProps {
    data: AccountReport;
}

const AdminAccountReportItem = ({ data }: AdminAccountReportItemProps) => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const queryClient = useQueryClient();
    const { success } = useMessage();

    if (!accountInfo) {
        return null;
    }

    const { mutate: updateReportAccount } = useUpdateReportAccount(data?.reportAccountId, {
        onSuccess: () => {
            success('Report account updated successfully!');
            queryClient.invalidateQueries({
                queryKey: reportKeys.reportAccountListing(),
            });
        },
    });

    return (
        <Card>
            <Flex vertical gap={8}>
                <Flex align="center" justify="space-between">
                    <Space size="large">
                        <Space size="large">
                            <UserInfo account={data?.reporter} />
                            To:
                            <UserInfo account={data?.reported} />
                        </Space>
                    </Space>

                    <Flex gap={4} align="center">
                        <Tag
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 24,
                                fontSize: 12,
                            }}
                            color={mapFeedbackStatusColor(data?.status)}
                        >
                            {data?.status}
                        </Tag>

                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: '1',
                                        label: (
                                            <Tag
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: 24,
                                                    fontSize: 12,
                                                }}
                                                color={mapFeedbackStatusColor('APPROVED')}
                                            >
                                                APPROVED
                                            </Tag>
                                        ),
                                        onClick: () => updateReportAccount('APPROVED'),
                                        disabled: data?.status !== 'PENDING',
                                    },
                                    {
                                        key: '2',
                                        label: (
                                            <Tag
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: 24,
                                                    fontSize: 12,
                                                }}
                                                color={mapFeedbackStatusColor('REJECTED')}
                                            >
                                                REJECTED
                                            </Tag>
                                        ),
                                        onClick: () => updateReportAccount('REJECTED'),
                                        disabled: data?.status !== 'PENDING',
                                    },
                                ],
                            }}
                        >
                            <Button type="text" icon={<EllipsisOutlined style={{ fontSize: 20 }} />} />
                        </Dropdown>
                    </Flex>
                </Flex>

                <Typography.Text type="secondary">
                    {dayjsConfig(data?.reportTime)?.format(FULL_TIME_FORMAT)}
                </Typography.Text>

                <Typography.Title level={4}>{data?.title}</Typography.Title>
                <Typography.Paragraph>{data?.reason}</Typography.Paragraph>
            </Flex>
        </Card>
    );
};

export default AdminAccountReportItem;
