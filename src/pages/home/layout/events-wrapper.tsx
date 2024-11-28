import { Flex } from 'antd';
import React, { FC } from 'react';

interface EventsWrapperProps {
    children: React.ReactNode;
}

export const EventsWrapper: FC<EventsWrapperProps> = ({ children }) => {
    return (
        <Flex vertical gap={20}>
            {children}
        </Flex>
    );
};
