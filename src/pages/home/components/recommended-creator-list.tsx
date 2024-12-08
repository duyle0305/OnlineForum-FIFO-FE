import { Card, Empty, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

import ArrowRightSvg from '/public/arrow-right.svg';
import { useGetFollows } from '@/hooks/query/follow/use-follow-listing';
import { useGetFollowTopAccounts, useGetRecommendations } from '@/hooks/query/follow/use-follow-top-accounts';
import { PATHS } from '@/utils/paths';

import { EventsWrapper } from '../layout/events-wrapper';
import { RecommendedItem } from './recommended-item';

export const RecommendedCreatorList = () => {
    const navigate = useNavigate();

    const { data: topAccounts } = useGetRecommendations();
    const { data: follows } = useGetFollows();

    return (
        <Card
            title={
                <Flex
                    align="center"
                    gap={4}
                    onClick={() => navigate(PATHS.RECOMMENDATIONS)}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    Recommended creator
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
                {topAccounts?.length ? (
                    topAccounts
                        ?.slice(0, 5)
                        ?.map(account => (
                            <RecommendedItem
                                key={account?.account?.accountId}
                                account={account?.account}
                                follows={follows}
                            />
                        ))
                ) : (
                    <Empty description="No recommendation" />
                )}
            </EventsWrapper>
        </Card>
    );
};
