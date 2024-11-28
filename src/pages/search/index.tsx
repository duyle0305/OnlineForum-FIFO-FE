import { UserInfo } from '@/components/user/user-info';
import { useCategorySearch } from '@/hooks/query/utility/use-category-search';
import { Account } from '@/types/account';
import { PATHS } from '@/utils/paths';
import { Card, Flex, Tag } from 'antd';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PostSummary } from '../home/components/post-summary';
import { PostItem } from '@/components/post/post-item';

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchKeyword = searchParams.get('keyword');

    const { data: searchData } = useCategorySearch({
        params: {
            keyword: searchKeyword || '  ',
        },
    });

    const resetKeyword = () => {
        searchParams.delete('keyword');
    };

    const searchCategoryDropdownItems = searchData?.categoryList.map(category => ({
        key: category.categoryId,
        label: category.name,
        onClick: () => {
            navigate(`${PATHS.POSTS}?category=${category.categoryId}`);
            resetKeyword();
        },
    }));

    const searchTopicDropdownItems = searchData?.topicList.map(topic => ({
        key: topic.topicId,
        label: topic.name,
        onClick: () => {
            navigate(`${PATHS.POSTS}?topic=${topic.topicId}`);
            resetKeyword();
        },
    }));

    const searchPostDropdownItems = searchData?.postList.map(post => ({
        key: post.postId,
        label: post.title,
        onClick: () => {
            navigate(PATHS.POSTS);
            resetKeyword();
        },
    }));

    const searchAccountDropdownItems = searchData?.accountList.map(account => ({
        key: account.accountId,
        label: account.username,
        onClick: () => {
            navigate(PATHS.USER_PROFILE.replace(':id', account?.accountId));
            resetKeyword();
        },
    }));

    const searchDropdownItems = [
        ...(searchCategoryDropdownItems || []),
        ...(searchTopicDropdownItems || []),
        ...(searchPostDropdownItems || []),
        ...(searchAccountDropdownItems || []),
    ];

    return (
        <Flex vertical gap={20}>
            {searchData?.accountList && searchData?.accountList?.length > 0 && (
                <Card title="Account">
                    <Flex vertical gap={16}>
                        {searchData?.accountList?.map((item, index) => (
                            <UserInfo key={index} account={item} />
                        ))}
                    </Flex>
                </Card>
            )}

            {searchData?.categoryList && searchData?.categoryList?.length > 0 && (
                <Card title="Category">
                    <Flex vertical gap={16}>
                        {searchData?.categoryList?.map((item, index) => (
                            <PostSummary key={index} data={item} />
                        ))}
                    </Flex>
                </Card>
            )}

            {searchData?.topicList && searchData?.topicList?.length > 0 && (
                <Card title="Topic">
                    <Flex gap={16} wrap>
                        {searchData?.topicList?.map((item, index) => (
                            <Tag
                                key={item.topicId}
                                style={{
                                    fontSize: 14,
                                    minHeight: 32,
                                    minWidth: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate(`${PATHS.POSTS}?category=${item?.category?.categoryId}&topic=${item.topicId}`)}
                            >
                                {item.name}
                            </Tag>
                        ))}
                    </Flex>
                </Card>
            )}

            {searchData?.postList && searchData?.postList?.length > 0 && (
                <Card title="Post">
                    <Flex vertical gap={16}>
                        {searchData?.postList?.map((item, index) => (
                            <div
                                style={{
                                    backgroundColor: '#4799eb0a',
                                    padding: 16,
                                    borderRadius: 8,
                                }}
                            >
                                <PostItem key={index} data={item} showActions={false} showLike={false} />
                            </div>
                        ))}
                    </Flex>
                </Card>
            )}
        </Flex>
    );
};

export default SearchPage;
