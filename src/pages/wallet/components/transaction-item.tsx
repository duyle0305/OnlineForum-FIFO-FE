// import type { FC } from 'react';

// import { css } from '@emotion/react';
// import { Avatar, Flex, Typography } from 'antd';
// import dayjs from 'dayjs';
// import { title } from 'process';

// import { FULL_TIME_FORMAT } from '@/consts/common';
// import { formatSignedNumber } from '@/utils/number';

// interface TransactionItemProps {
//     image: string;
//     title: string;
//     description: string;
//     amount: number;
//     createdDate: string;
// }

// const TransactionItem: FC<TransactionItemProps> = ({ image, title, description, amount, createdDate }) => {
//     const isNegative = description === 'Transaction' || description === 'Order Point'; // Kiểm tra loại giao dịch

//     return (
//         <Flex align="center" justify="space-between">
//             <Flex align="center" gap={8}>
//                 <div className="image">
//                     <Avatar src={image} size={50}></Avatar>
//                 </div>
//                 <div>
//                     <div>
//                         <Typography.Text className="text-title">{title}</Typography.Text>
//                     </div>
//                     <div>
//                         <Typography.Text type="secondary" className="text-description">
//                             {description}
//                         </Typography.Text>
//                     </div>
//                 </div>
//             </Flex>

//             <Typography.Text className="text-description">
//                 {dayjs(createdDate).format(FULL_TIME_FORMAT)}
//             </Typography.Text>

//             {/* <div
//                 style={{
//                     color: description !== 'Transaction' ? '#18C07A' : '#FF0000',
//                 }}
//             >
//                 {formatSignedNumber(amount)} MC
//             </div> */}
//             <div
//                 style={{
//                     color: isNegative ? '#FF0000' : '#18C07A', // Chuyển màu thành đỏ nếu là giao dịch trừ
//                 }}
//             >
//                 {isNegative ? `-${formatSignedNumber(amount)}` : formatSignedNumber(amount)} MC{' '}
//                 {/* Thêm dấu trừ nếu là giao dịch */}
//             </div>
//         </Flex>
//     );
// };

// // const styles = css(`
// //     .text-title {
// //         font-size: 16px;
// //         font-weight: 400;
// //     }

// //     .text-description {
// //         font-size: 14px;
// //         color: #bdbdbd;
// //     }

// //     .amount {
// //         margin-left: auto;
// //         font-size: 16px;
// //         font-weight: 400;
// //     }

// //     .deposit {
// //         color: #18C07A
// //     }

// //     .withdraw {
// //         color: #FF0000;
// //     }
// // `);
// const styles = css(`
//     .text-title {
//         font-size: 16px;
//         font-weight: 400;
//     }

//     .text-description {
//         font-size: 14px;
//         color: #bdbdbd;
//     }

//     .amount {
//         margin-left: auto;
//         font-size: 16px;
//         font-weight: 400;
//         display: flex;
//         align-items: center;
//     }

//     .transaction-item {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         width: 100%;
//     }

//     .image {
//         margin-right: 16px; /* Thêm khoảng cách giữa ảnh và nội dung */
//     }

//     .info {
//         flex: 1;
//     }

//     .date {
//         margin-right: 16px;
//     }

//     .deposit {
//         color: #18C07A;
//     }

//     .withdraw {
//         color: #FF0000;
//     }
// `);

// export default TransactionItem;
import type { FC } from 'react';

import { css } from '@emotion/react';
import { Avatar, Flex, Typography } from 'antd';
import dayjs from 'dayjs';

import { FULL_TIME_FORMAT } from '@/consts/common';
import { formatSignedNumber } from '@/utils/number';

interface TransactionItemProps {
    image: string;
    title: string;
    description: string;
    amount: number;
    createdDate: string;
}

const TransactionItem: FC<TransactionItemProps> = ({ image, title, description, amount, createdDate }) => {
    const isNegative = description === 'Transaction'; // Check if the transaction is negative

    return (
        <div css={style} className="transaction-item">
            <Flex align="center" justify="space-between" style={{ width: '100%' }}>
                {/* Left Section */}
                <Flex align="center" gap={8} style={{ flex: 1 }}>
                    <div className="image">
                        <Avatar src={image} size={50}></Avatar>
                    </div>
                    <div className="info">
                        <Typography.Text className="text-title">{title}</Typography.Text>
                        <Typography.Text type="secondary" className="text-description">
                            {description}
                        </Typography.Text>
                    </div>
                </Flex>

                {/* Date Section */}
                <Typography.Text className="text-description date">
                    {dayjs(createdDate).format(FULL_TIME_FORMAT)}
                </Typography.Text>

                {/* Amount Section */}
                <div className={isNegative ? 'withdraw' : 'deposit'}>
                    {isNegative ? `-${formatSignedNumber(amount)}` : formatSignedNumber(amount)} MC
                </div>
            </Flex>
        </div>
    );
};

// CSS styles using Emotion
const style = css`
    .transaction-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #ddd; /* Optional: Adds a separator between items */
    }

    .text-title {
        font-size: 16px;
        font-weight: 400;
        display: block; /* Ensures the title stays on its own line */
        margin-bottom: 4px; /* Adds space between title and description */
    }

    .text-description {
        font-size: 14px;
        color: #bdbdbd;
    }

    .amount {
        margin-left: auto;
        font-size: 16px;
        font-weight: 400;
        display: flex;
        align-items: center;
    }

    .image {
        margin-right: 16px; /* Adds space between the image and the text */
    }

    .info {
        flex: 1;
    }

    .date {
        margin-left: 200px; /* Adds space between the date and the amount */
        margin-right: 100px;
        //Space from the amount section
    }

    .deposit {
        color: #18c07a;
    }

    .withdraw {
        color: #ff0000;
    }
`;

export default TransactionItem;
