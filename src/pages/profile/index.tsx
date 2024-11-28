import { Empty, TabsProps } from 'antd';
import { ProfileInfo } from './components/profile-info';
import { BaseTab } from '@/components/core/tab';
import { PostItem } from '@/components/post/post-item';
import { Medias } from './components/medias';
import { PostWrapper } from '../post/layout/post-wrapper';
import { PaginationParams } from '@/types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { RootState } from '@/stores';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const { data } = usePostsListing({
        params: {
            ...initialParams,
            accountId: accountInfo?.accountId,
        },
    });

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Posts',
            children: (
                <PostWrapper showHeader={false}>
                    {!data || !data.length ? <Empty /> : data.map(post => <PostItem data={post} key={post.postId} />)}
                </PostWrapper>
            ),
        },
        {
            key: '2',
            label: 'Replies',
            children: <div></div>,
        },
        {
            key: '3',
            label: 'Media',
            children: <Medias />,
        },
    ];

    return (
        <div>
            <ProfileInfo />
            <BaseTab items={items} defaultActiveKey="1" />
        </div>
    );
};

export default ProfilePage;
