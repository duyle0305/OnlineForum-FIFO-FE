import { UserInfo } from '@/components/user/user-info';
import { FULL_TIME_FORMAT } from '@/consts/common';
import { RootState } from '@/stores';
import { Feedback } from '@/types/feedback/feedback';
import dayjsConfig from '@/utils/dayjs';
import { Button, Card, Dropdown, Flex, Space, Tag, Typography } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { EllipsisOutlined } from '@ant-design/icons';
import { useUpdateFeedback } from '@/hooks/mutate/feedback/use-update-feedback';
import { useMessage } from '@/hooks/use-message';
import { useQueryClient } from '@tanstack/react-query';
import { feedbackKeys } from '@/consts/factory/feedback';
import { mapFeedbackStatusColor } from '../../feedback/utils/map-feedback-status-color';
import { PostReport } from '@/types/report/report';
import { useUpdatePostReport } from '@/hooks/mutate/report/use-update-post-report';
import { reportKeys } from '@/consts/factory/report';

interface AdminReportItemProps {
    data: PostReport;
    setPostId: Dispatch<SetStateAction<null | string>>;
    setReport: Dispatch<SetStateAction<PostReport | null>>;
}

const AdminReportItem = ({ data, setPostId, setReport }: AdminReportItemProps) => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const queryClient = useQueryClient();
    const { success } = useMessage();

    if (!accountInfo) {
        return null;
    }

    const { mutate: updatePostReport } = useUpdatePostReport(data?.reportId, {
        onSuccess: () => {
            success('Feedback updated successfully!');
            queryClient.invalidateQueries({
                queryKey: reportKeys.reportPostListing(),
            });
        },
    });

    return (
        <Card
            onClick={() => {
                setPostId(data?.postId);
                setReport(data as PostReport);
            }}
        >
            <Flex vertical gap={8}>
                <Flex align="center" justify="space-between">
                    <Space size="large">
                        <UserInfo account={data?.account} />
                        <Typography.Text type="secondary">
                            {dayjsConfig(data?.postCreatedDate)?.format(FULL_TIME_FORMAT)}
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
                                        onClick: e => {
                                            e.domEvent.stopPropagation();
                                            updatePostReport('APPROVED');
                                        },
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
                                        onClick: e => {
                                            e.domEvent.stopPropagation();
                                            updatePostReport('REJECTED');
                                        },
                                        disabled: data?.status !== 'PENDING',
                                    },
                                ],
                            }}
                        >
                            <Button
                                onClick={e => e.stopPropagation()}
                                type="text"
                                icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
                            />
                        </Dropdown>
                    </Flex>
                </Flex>

                <Typography.Title level={4}>{data?.title}</Typography.Title>
                <Typography.Paragraph>{data?.description}</Typography.Paragraph>
            </Flex>
        </Card>
    );
};

export default AdminReportItem;
