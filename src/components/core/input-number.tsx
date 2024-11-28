import type { FC } from 'react';

import { InputNumber } from 'antd';

const DefaultInputNumber: FC = props => {
  return <InputNumber {...props} />;
};

const BaseInputNumber = Object.assign(InputNumber, DefaultInputNumber);

export default BaseInputNumber;
