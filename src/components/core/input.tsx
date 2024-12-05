import type { FC } from 'react';

import { Input } from 'antd';

const DefaultInput: FC = props => {
  return <Input {...props} />;
};

const BaseInput = Object.assign(Input, DefaultInput);

export default BaseInput;
