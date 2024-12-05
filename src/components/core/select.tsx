import type { FC } from 'react';

import { Select } from 'antd';

const DefaultSelect: FC = props => {
  return <Select {...props} />;
};

const BaseSelect = Object.assign(Select, DefaultSelect);

export default BaseSelect;
