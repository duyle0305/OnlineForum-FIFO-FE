import type { FC } from 'react';
import type { RouteProps } from 'react-router';

import BaseButton from '@/components/core/button';
import { Result } from 'antd';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

const PrivateRoute: FC<RouteProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Forbidden"
      extra={
        <BaseButton
          type="primary"
          onClick={() => navigate("/")}
        >
          Go to the Home Page
        </BaseButton>
      }
    />
  );
};

export default PrivateRoute;
