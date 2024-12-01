import { Flex, Tag, Typography } from 'antd';
import LocationSvg from '/public/location.svg';
import { Event } from '@/types/event';
import dayjsConfig from '@/utils/dayjs';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/utils/paths';

interface EventItemProps {
    event: Event;
}

export const EventItem = ({ event }: EventItemProps) => {
    const navigate = useNavigate();

    return (
        <Flex gap={16} className="event-item" onClick={() => navigate(PATHS.EVENT_DETAIL.replace(':id', event?.eventId))}>
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
                <Flex align="center" gap={6}>
                    <img src={LocationSvg} alt="location" />
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
        </Flex>
    );
};
