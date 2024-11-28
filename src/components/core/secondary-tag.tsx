import { themeConfig } from '@/consts/token';
import { ConfigProvider, Tag, TagProps } from 'antd';
import React, { FC } from 'react';

interface SecondaryTagProps extends TagProps {}

const SecondaryTag: FC<SecondaryTagProps> = props => {
    return (
        <ConfigProvider
            theme={{
                ...themeConfig,
                components: {
                    ...themeConfig.components,
                    Tag: {
                        ...themeConfig.components!.Tag,
                        colorBgContainer: '#FF6934',
                        colorText: '#fff',
                        fontSizeSM: 14,
                    },
                },
            }}
        >
            <Tag
                {...props}
                style={{ ...props.style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
        </ConfigProvider>
    );
};

export default SecondaryTag;
