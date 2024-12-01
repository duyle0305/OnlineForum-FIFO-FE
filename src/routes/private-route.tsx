// import type { FC } from 'react';
// import type { RouteProps } from 'react-router';

// import { Result } from 'antd';
// import { useLocation } from 'react-router';
// import { useNavigate } from 'react-router-dom';

// import BaseButton from '@/components/core/button';

// const PrivateRoute: FC<RouteProps> = props => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     return (
//         <Result
//             status="403"
//             title="403"
//             subTitle="Forbidden"
//             extra={
//                 <BaseButton type="primary" onClick={() => navigate('/')}>
//                     Go to the Home Page
//                 </BaseButton>
//             }
//         />
//     );
// };

// export default PrivateRoute;
import type { RootState } from '@/stores';

import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom'; // Import Outlet

import { PATHS } from '@/utils/paths';

const PrivateRoute = () => {
    const { logged } = useSelector((state: RootState) => state.account);
    const location = useLocation();

    if (!logged) {
        // Redirect to sign-in, preserving the intended location for after login
        return <Navigate to={PATHS.SIGNIN} state={{ from: location }} replace />;
    }

    // Render the children (the protected route's content)
    return <Outlet />;
};

export default PrivateRoute;
