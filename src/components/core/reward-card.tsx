import { themeConfig } from '@/consts/token';
import { Card, CardProps, ConfigProvider } from 'antd';
import React, { FC } from 'react';

interface RewardCardProps extends CardProps {}

const RewardCard: FC<RewardCardProps> = props => {
    return (
        <ConfigProvider
            theme={{
                ...themeConfig,
                components: {
                    ...themeConfig.components,
                    Card: {
                        ...themeConfig.components!.Card,
                        colorBorderSecondary: '#838383',
                    },
                },
            }}
        >
            <Card {...props} />
        </ConfigProvider>
    );
};

export default RewardCard;
