import type { CheckboxProps } from 'antd';
import type { FC } from 'react';

import { Checkbox } from 'antd';

interface BaseButtonProps extends CheckboxProps {}

const DefaultCheckBox: FC<BaseButtonProps> = props => {
  return <Checkbox {...props} />;
};

const BaseCheckBox = Object.assign(Checkbox, DefaultCheckBox);

export default BaseCheckBox;
