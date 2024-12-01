import { Card, Empty, Flex } from 'antd';
import ArrowRightSvg from '/public/arrow-right.svg';
import { EventsWrapper } from '../layout/events-wrapper';
import { EventItem } from './event-item';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/utils/paths';
import { useEventListing } from '@/hooks/query/event/use-event-listing';

export const EventList = () => {
    const navigate = useNavigate();

    const { data: events } = useEventListing();

    return (
        <Card
            title={
                <Flex
                    align="center"
                    gap={4}
                    onClick={() => navigate(PATHS.EVENTS)}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    Events
                    <img src={ArrowRightSvg} />
                </Flex>
            }
            style={{
                width: 326,
                height: 'fit-content',
            }}
            className="card-menu card-events"
        >
            <EventsWrapper>
                {events?.length ? (
                    events?.slice(0, 3)?.map(event => <EventItem key={event.eventId} event={event} />)
                ) : (
                    <Empty description="No new events" />
                )}
            </EventsWrapper>
        </Card>
    );
};
