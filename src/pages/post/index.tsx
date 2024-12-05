import { BaseTab } from '@/components/core/tab';
import { TabsProps } from 'antd';
import { ExplorePostList } from './components/explore-post-list';
import { HomePostList } from './components/home-post-list';

const PostPage = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Home',
            children: <HomePostList />,
        },
        {
            key: '2',
            label: 'Explore',
            children: <ExplorePostList />,
        },
    ];

    return (
        <>
            <BaseTab items={items} defaultActiveKey="1" />
        </>
    );
};

export default PostPage;
