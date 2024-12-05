import type { FC } from 'react';

import { Spin } from 'antd';

const DefaultSpin: FC = props => {
  return <Spin {...props} />;
};

const BaseSpin = Object.assign(Spin, DefaultSpin);

export default BaseSpin;
