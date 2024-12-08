import type { Event } from '@/types/event';

import { Flex, Typography } from 'antd';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import PlaceholderSvg from '/public/placeholder.svg';
import RewardCard from '@/components/core/reward-card';
import dayjsConfig from '@/utils/dayjs';
import { PATHS } from '@/utils/paths';

interface EventItemProps {
    event: Event;
}

const EventItem = ({ event }: EventItemProps) => {
    const navigate = useNavigate();

    return (
        <RewardCard
            hoverable
            style={{ width: 348 }}
            onClick={() => navigate(PATHS.EVENT_DETAIL.replace(':id', event?.eventId))}
            cover={
                <img alt="example" src={event?.image || PlaceholderSvg} style={{ height: 180, objectFit: 'cover' }} />
            }
        >
            <Flex gap={10} align="center">
                <Flex vertical justify="space-between" align="center" className="event-date-wrapper">
                    <Typography.Title level={5} style={{ textTransform: 'uppercase' }}>
                        {dayjsConfig(event?.startDate).format('MMM')}
                    </Typography.Title>
                    <Typography.Title level={2} className="event-date">
                        {dayjsConfig(event?.startDate).format('DD')}
                    </Typography.Title>
                </Flex>

                <Flex vertical gap={10}>
                    <Typography.Title level={5} style={{ textTransform: 'uppercase' }}>
                        {event?.title}
                    </Typography.Title>
                    <Typography.Text
                        style={{
                            fontSize: 10,
                        }}
                        type="secondary"
                    >
                        {event?.location}
                    </Typography.Text>
                </Flex>
            </Flex>
        </RewardCard>
    );
};

export default EventItem;
