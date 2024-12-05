import { themeConfig } from '@/consts/token';
import { ConfigProvider, Tag } from 'antd';
import { FC } from 'react';

interface PostTagProps {
    children: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
}

export const PostTag: FC<PostTagProps> = ({ children, backgroundColor = '#518EF8', textColor = 'white' }) => {
    return (
        <ConfigProvider
            theme={{
                ...themeConfig,
                components: {
                    ...themeConfig.components,
                    Tag: {
                        ...themeConfig.components!.Tag,
                        colorBgContainer: backgroundColor,
                        colorText: textColor,
                        fontSizeSM: 14,
                    },
                },
            }}
        >
            <Tag onClick={e => e.stopPropagation()}>{children}</Tag>
        </ConfigProvider>
    );
};
