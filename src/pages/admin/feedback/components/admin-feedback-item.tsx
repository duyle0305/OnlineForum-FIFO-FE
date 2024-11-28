import { UserInfo } from '@/components/user/user-info';
import { FULL_TIME_FORMAT } from '@/consts/common';
import { RootState } from '@/stores';
import { Feedback } from '@/types/feedback/feedback';
import dayjsConfig from '@/utils/dayjs';
import { Button, Card, Dropdown, Flex, Space, Tag, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { mapFeedbackStatusColor } from '../utils/map-feedback-status-color';
import { EllipsisOutlined } from '@ant-design/icons';
import { useUpdateFeedback } from '@/hooks/mutate/feedback/use-update-feedback';
import { useMessage } from '@/hooks/use-message';
import { useQueryClient } from '@tanstack/react-query';
import { feedbackKeys } from '@/consts/factory/feedback';

interface AdminFeedbackItemProps {
    data: Feedback;
}

const AdminFeedbackItem = ({ data }: AdminFeedbackItemProps) => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const queryClient = useQueryClient();
    const {success} = useMessage();

    if (!accountInfo) {
        return null;
    }

    const {
        mutate: updateFeedback,
    } = useUpdateFeedback(data?.feedbackId, {
        onSuccess: () => {
            success('Feedback updated successfully!');
            queryClient.invalidateQueries({
                queryKey: feedbackKeys.listing(),
            });
        }
    });

    return (
        <Card>
            <Flex vertical gap={8}>
                <Flex align="center" justify="space-between">
                    <Space size="large">
                        <UserInfo account={data?.account || accountInfo} />
                        <Typography.Text type="secondary">
                            {dayjsConfig(data?.createdDate)?.format(FULL_TIME_FORMAT)}
                        </Typography.Text>
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
                                        onClick: () => updateFeedback('APPROVED'),
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
                                        onClick: () => updateFeedback('REJECTED'),
                                        disabled: data?.status !== 'PENDING',
                                    },
                                ],
                            }}
                        >
                            <Button type="text" icon={<EllipsisOutlined style={{ fontSize: 20 }} />} />
                        </Dropdown>
                    </Flex>
                </Flex>

                <Typography.Title level={4}>{data?.title}</Typography.Title>
                <Typography.Paragraph>{data?.content}</Typography.Paragraph>
            </Flex>
        </Card>
    );
};

export default AdminFeedbackItem;
