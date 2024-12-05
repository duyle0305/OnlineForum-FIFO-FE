// import type { ButtonProps } from 'antd/es/button';
import type { ButtonProps } from 'antd';
import type { FC } from 'react';

import { Button } from 'antd';

interface BaseButtonProps extends ButtonProps { }

const DefaultButton: FC<BaseButtonProps> = props => {
  return <Button {...props} />;
};

const BaseButton = Object.assign(Button, DefaultButton);

export default BaseButton;
