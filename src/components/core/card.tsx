import { Card, CardProps } from 'antd';
import { FC } from 'react';

interface BaseCardProps extends CardProps {}

export const BaseCard: FC<BaseCardProps> = props => {
    return <Card {...props} />;
};
