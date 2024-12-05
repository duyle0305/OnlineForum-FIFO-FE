import type { FC } from 'react';

import { Menu, MenuProps } from 'antd';

interface BaseMenuProps extends MenuProps {}

const DefaultMenu: FC<BaseMenuProps> = props => {
    return <Menu {...props} />;
};

const BaseMenu = Object.assign(Menu, DefaultMenu);

export default BaseMenu;
