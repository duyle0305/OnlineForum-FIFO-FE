import type { OnAction } from '@/types';
import type { FC } from 'react';

import { Button, Space } from 'antd';

interface IconButtonProps {
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: OnAction;
    disabled?: boolean;
    style?: React.CSSProperties;
}

export const IconButton: FC<IconButtonProps> = ({ icon, children, onClick, disabled, style }) => {
    return (
        <Button type="text" size="small" onClick={onClick} disabled={disabled} style={style}>
            <Space align="center">
                {icon}
                {children}
            </Space>
        </Button>
    );
};
