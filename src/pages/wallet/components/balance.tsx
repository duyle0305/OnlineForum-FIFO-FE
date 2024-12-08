import type { FC } from 'react';

import { css } from '@emotion/react';
import { Typography } from 'antd';

import { numberFormat } from '@/utils/number';

interface Balance {
    balance: number;
}

const Balance: FC<Balance> = ({ balance }) => {
    return (
        <div css={styles}>
            <div>
                <Typography.Text strong className="description">
                    Available Balance
                </Typography.Text>
            </div>
            <div>
                <Typography.Text strong className="balance">
                    {' '}
                    {numberFormat(balance, '.')} MC
                </Typography.Text>
            </div>
        </div>
    );
};

const styles = css(`
    background: #FF6934;
    text-align: center;
    padding-top: 50px;
    padding-bottom: 50px;

    .description {
        font-size: 16px;
    }

    .balance {
        font-size: 24px;
    }
`);

export default Balance;
