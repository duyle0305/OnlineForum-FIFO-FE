import { FC, useEffect } from 'react';
import { Empty, Spin } from 'antd';
import {
    CategoryListingParams,
    useCategoriesListing,
    useCategoriesListingForStaff,
} from '@/hooks/query/category/use-category-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { PostSummary } from './components/post-summary';
import { PostWrapper } from './layout/post-wrapper';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { PATHS } from '@/utils/paths';
import { useNavigate } from 'react-router-dom';

const initialParams: CategoryListingParams = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
};

const HomePage: FC = props => {
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const { data, isLoading } = useCategoriesListing({
        params: initialParams,
        enabled: accountInfo?.role?.name === 'USER',
    });
    const { data: staffData, isLoading: staffIsLoading } = useCategoriesListingForStaff({
        params: initialParams,
        enabled: accountInfo?.role?.name === 'STAFF',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (accountInfo?.role?.name === 'ADMIN') {
            navigate(PATHS.ADMIN_DASHBOARD);
        }
    }, [accountInfo]);

    const dataSource = accountInfo?.role?.name === 'USER' ? data : staffData;

    if (!dataSource || dataSource.length === 0) {
        return <Empty />;
    }

    return (
        <Spin spinning={isLoading}>
            <PostWrapper>
                {dataSource.map(category => (
                    <PostSummary key={category.categoryId} data={category} />
                ))}
            </PostWrapper>
        </Spin>
    );
};

export default HomePage;
