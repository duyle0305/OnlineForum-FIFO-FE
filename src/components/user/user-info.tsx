import { setAccountState } from '@/stores/account';
import { Account } from '@/types/account';
import { Avatar, Flex, Typography } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AvatarPlaceholder from '/public/avatar-placeholder.svg';

interface UserInfoProps {
    account: Account;
}

export const UserInfo: FC<UserInfoProps> = ({ account }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = () => {
        navigate(`/user-profile/${account?.accountId}`);
        dispatch(setAccountState({ userInfo: account }));
    };

    return (
        <Flex align="center" onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
        }} gap={8}>
            <Avatar size={40} shape="circle" src={account?.avatar || AvatarPlaceholder} />
            <Flex vertical>
                <Typography.Text>{account?.username}</Typography.Text>
                <Typography.Text type="secondary">{account?.handle?.toLowerCase()}</Typography.Text>
            </Flex>
        </Flex>
    );
};
