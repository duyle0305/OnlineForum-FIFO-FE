import RewardCard from '@/components/core/reward-card';
import React from 'react';
import PlaceholderSvg from '/public/placeholder.svg';
import { Flex, Typography } from 'antd';
import { Event } from '@/types/event';
import dayjsConfig from '@/utils/dayjs';
import { useNavigate } from 'react-router-dom';
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
            cover={
                <img alt="example" src={event?.image || PlaceholderSvg} style={{ height: 180, objectFit: 'cover' }} />
            }
            onClick={() => navigate(PATHS.EVENT_DETAIL.replace(':id', event?.eventId))}
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
