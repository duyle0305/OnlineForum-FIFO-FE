import type { GetProp, MenuProps } from 'antd';
import type { FC } from 'react';

import Icon, {
    FlagOutlined,
    MoneyCollectOutlined,
    TagOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Flex, Space, Tooltip, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import AndroidSvg from '/public/android.svg';
import AppleSvg from '/public/apple.svg';
import ChatbotSvg from '/public/chatbot.svg';
import ToolKitSvg from '/public/toolkit.svg';
import BaseMenu from '@/components/core/menu';
import { usePopularTopics } from '@/hooks/query/topic/use-popular-topic';
import { PATHS } from '@/utils/paths';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const PopularMenuAdmin = () => {
    const navigate = useNavigate();
    const { data } = usePopularTopics();

    const menuItems: MenuItem[] = [
        {
            key: '1',
            label: 'Category',
            icon: <UnorderedListOutlined />,
            onClick: () => navigate(PATHS.ADMIN_CATEGORY),
        },
        {
            key: '2',
            label: 'Topic',
            icon: <FlagOutlined />,
            onClick: () => navigate(PATHS.ADMIN_TOPICS),
        },
        {
            key: '3',
            label: 'Tag',
            icon: <TagOutlined />,
            onClick: () => navigate(PATHS.ADMIN_TAGS),
        },
        // {
        //     key: '4',
        //     label: 'Reward',
        //     icon: <MoneyCollectOutlined />,
        //     onClick: () => navigate(PATHS.ADMIN_REWARDS),
        // },
        {
            key: '5',
            label: 'Users',
            icon: <UserOutlined />,
            onClick: () => navigate(PATHS.ADMIN_USERS),
        },
    ];

    return (
        <>
            <BaseMenu items={menuItems} />
        </>
    );
};

interface LabelProps {
    topic: string;
    category: string;
    subLabel: string;
    subLabel2?: string;
}

const Label: FC<LabelProps> = ({ topic, subLabel, category, subLabel2 }) => {
    return (
        <Flex vertical justify="space-between">
            <Flex
                align="center"
                justify="flex-start"
                gap={4}
                style={{
                    lineHeight: '1',
                    maxWidth: 150,
                    overflow: 'hidden',
                }}
            >
                <Tooltip title={`${topic} - ${category}`}>
                    <Typography.Text strong style={{ color: '#1D9BF0' }}>
                        {topic}
                    </Typography.Text>
                    {' - '}
                    <Typography.Text style={{ color: '#FF6934' }}>{category}</Typography.Text>
                </Tooltip>
            </Flex>
            <Typography.Text
                style={{
                    fontSize: 10,
                }}
                type="secondary"
                ellipsis
            >
                {subLabel}
            </Typography.Text>
            <Typography.Text
                style={{
                    fontSize: 10,
                }}
                type="secondary"
                ellipsis
            >
                {subLabel2}
            </Typography.Text>
        </Flex>
    );
};
