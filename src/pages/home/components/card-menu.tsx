import { Card, CardProps } from 'antd';
import { FC } from 'react';

interface CardMenuProps extends CardProps {}

export const CardMenu: FC<CardMenuProps> = props => {
    return <Card {...props} className={`${props.className ?? ''} card-menu`} />;
};
