import type { FC } from 'react';

import { Switch } from 'antd';

const DefaultSwitch: FC = ({ children: _, ...props }) => {
  return <Switch {...props} />;
};

const BaseSwitch = Object.assign(Switch, DefaultSwitch);

export default BaseSwitch;
