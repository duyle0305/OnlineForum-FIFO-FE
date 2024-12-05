import { Tabs, TabsProps } from 'antd';
import { FC } from 'react';

interface BaseTabProps extends TabsProps {}

export const BaseTab: FC<BaseTabProps> = props => {
    return <Tabs {...props} centered tabBarGutter={240} />;
};
