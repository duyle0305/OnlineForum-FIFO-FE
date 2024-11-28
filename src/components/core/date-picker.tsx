import type { FC } from 'react';

import { DatePicker } from 'antd';

const DefaultPicker: FC = props => {
  return <DatePicker {...props} />;
};

const BaseDatePicker = Object.assign(DatePicker, DefaultPicker);

export default BaseDatePicker;
