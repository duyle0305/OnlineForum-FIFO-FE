import { Flex } from 'antd';
import React, { FC } from 'react';

interface PostWrapperProps {
    children: React.ReactNode;
}

export const PostWrapper: FC<PostWrapperProps> = ({ children }) => {
    return (
        <Flex vertical gap={20}>
            {children}
        </Flex>
    );
};
