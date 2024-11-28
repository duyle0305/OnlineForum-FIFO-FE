import { themeConfig } from '@/consts/token';
import { Button, ButtonProps, ConfigProvider } from 'antd';
import { FC } from 'react';

interface SecondaryButtonProps extends ButtonProps {}

export const SecondaryButton: FC<SecondaryButtonProps> = props => {
    return (
        <ConfigProvider
            theme={{
                ...themeConfig,
                components: {
                    ...themeConfig.components,
                    Button: {
                        ...themeConfig.components!.Button,
                        colorPrimary: '#FF6934',
                        borderRadius: 6,
                    },
                },
            }}
        >
            <Button {...props} size='large' type="primary" />
        </ConfigProvider>
    );
};
