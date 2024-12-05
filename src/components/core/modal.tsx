import type { FC } from 'react';

import { Modal } from 'antd';

const DefaultModal: FC = props => {
  return <Modal {...props} />;
};

const BaseModal = Object.assign(Modal, DefaultModal);

export default BaseModal;
