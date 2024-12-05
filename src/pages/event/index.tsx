import { Card, Col, Divider, Flex, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

import BackgroundPlaceholder from '/public/background-placeholder.svg';
import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { DATE_FORMAT } from '@/consts/common';
import { useGetEvent } from '@/hooks/query/event/use-event-detail';
import dayjsConfig from '@/utils/dayjs';

const EventPage = () => {
    const { id } = useParams();

    const { data: event } = useGetEvent(id || '');

    return (
        <Card>
            <Flex vertical>
                <PageBreadcrumbs />

                <Divider />

                <Flex vertical gap={32}>
                    <Flex vertical gap={10}>
                        <Image
                            src={event?.image || BackgroundPlaceholder}
                            alt="logo"
                            width="100%"
                            height={260}
                            style={{ objectFit: 'cover', cursor: 'pointer' }}
                            preview={false}
                        />
                        <Typography.Title level={3}>{event?.title}</Typography.Title>
                    </Flex>

                    <Row gutter={[12, 12]}>
                        <Col span={12}>
                            <Space direction="vertical" size="small">
                                <Typography.Title level={5}>Date</Typography.Title>
                                <Typography.Text>
                                    {dayjsConfig(event?.startDate).format(DATE_FORMAT)} - {''}
                                    {dayjsConfig(event?.endDate).format(DATE_FORMAT)}
                                </Typography.Text>
                            </Space>
                        </Col>

                        <Col span={12}>
                            <Space direction="vertical" size="small">
                                <Typography.Title level={5}>Location</Typography.Title>
                                <Typography.Text>{event?.location}</Typography.Text>
                            </Space>
                        </Col>

                        <Col span={12}>
                            <Space direction="vertical" size="small">
                                <Typography.Title level={5}>Event Link</Typography.Title>
                                <Typography.Text
                                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                    onClick={() => window.open(event?.link)}
                                >
                                    {event?.title}
                                </Typography.Text>
                            </Space>
                        </Col>

                        <Col span={12}>
                            <Space direction="vertical" size="small">
                                <Typography.Title level={5}>Time</Typography.Title>
                                <Typography.Text>{dayjsConfig(event?.startDate)?.format('HH:mm')}</Typography.Text>
                            </Space>
                        </Col>
                    </Row>
                </Flex>

                <Divider />

                <Flex vertical gap={10}>
                    <Typography.Title level={4}>About Event</Typography.Title>
                    <Typography.Paragraph>{event?.content}</Typography.Paragraph>
                </Flex>
            </Flex>
        </Card>
    );
};

export default EventPage;
