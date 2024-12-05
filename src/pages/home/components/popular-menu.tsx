import BaseMenu from '@/components/core/menu';
import Icon from '@ant-design/icons';
import { Flex, GetProp, MenuProps, Space, Tooltip, Typography } from 'antd';
import AppleSvg from '/public/apple.svg';
import AndroidSvg from '/public/android.svg';
import ChatbotSvg from '/public/chatbot.svg';
import ToolKitSvg from '/public/toolkit.svg';
import { FC } from 'react';
import { usePopularTopics } from '@/hooks/query/topic/use-popular-topic';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/utils/paths';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const PopularMenu = () => {
    const navigate = useNavigate();
    const { data } = usePopularTopics();

    const menuItems: MenuItem[] =
        data?.map(topic => ({
            key: topic?.topicId,
            label: (
                <Label
                    topic={topic?.name}
                    subLabel={`${topic?.postAmount} Posted by this topic`}
                    subLabel2={`${topic?.viewAmount} Views - ${topic?.upvoteAmount} Upvotes`}
                    category={topic?.category?.name || ''}
                />
            ),
            icon: <Icon component={() => <img src={topic?.imageUrl} alt={topic?.name} />} />,
            onClick: () => navigate(`${PATHS.POSTS}?category=${topic?.category?.categoryId}&topicId=${topic?.topicId}`),
        })) || [];

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
