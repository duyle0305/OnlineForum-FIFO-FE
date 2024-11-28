import { RootState } from '@/stores';
import { useSelector } from 'react-redux';

export const useAuthorize = () => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    return accountInfo?.role?.name === 'ADMIN' || accountInfo?.role?.name === 'STAFF';
};
