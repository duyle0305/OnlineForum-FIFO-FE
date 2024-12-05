import type { FC } from 'react';

import { Radio } from 'antd';

const DefaultRadio: FC = props => {
  return <Radio {...props} />;
};

const BaseRadio = Object.assign(Radio, DefaultRadio);

export default BaseRadio;
