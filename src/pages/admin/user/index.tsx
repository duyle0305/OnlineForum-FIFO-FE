import BaseInput from '@/components/core/input';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { UserListingParams, useUsersListing } from '@/hooks/query/user/use-user-listing';
import { useDebounce } from '@/hooks/use-debounce';
import { Account } from '@/types/account';
import { PATHS } from '@/utils/paths';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Flex, Input, Space, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUserPage = () => {
    const navigate = useNavigate();
    const [params, setParams] = useState<UserListingParams>({ page: DEFAULT_PAGE, perPage: DEFAULT_PAGE_SIZE });
    const [search, setSearch] = useState('');

    const searchDebounce = useDebounce(search, 500);

    useEffect(() => {
        setParams(prev => ({ ...prev, username: searchDebounce, email: searchDebounce, page: DEFAULT_PAGE }));
    }, [searchDebounce]);

    const { data, isFetching } = useUsersListing({ params: { ...params } });

    const columns: ColumnsType<Account> = [
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            render: (_, record) => (
                <Typography.Text
                    style={{
                        color: '#1890ff',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                       navigate(PATHS.USER_PROFILE.replace(':id', record.accountId));
                    }}
                >
                    {record.username}
                </Typography.Text>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Points',
            dataIndex: 'wallet',
            key: 'wallet',
            render: (_, record) => `${record?.wallet?.balance} MC`,
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <Tag bordered={false} color={record?.status === 'ACTIVE' ? 'green' : 'red'}>
                    {record.status}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => {}} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => {}} />
                </Space>
            ),
        },
    ];

    return (
        <Card>
            <Flex vertical gap={20}>
                <Typography.Title level={4}>Users</Typography.Title>

                <BaseInput.Search
                    placeholder="Type here to search..."
                    className="search"
                    size="large"
                    onChange={e => setSearch(e.target.value)}
                />

                <Table<Account>
                    loading={isFetching}
                    columns={columns}
                    dataSource={data}
                    rowKey="accountId"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            </Flex>
        </Card>
    );
};

export default AdminUserPage;
