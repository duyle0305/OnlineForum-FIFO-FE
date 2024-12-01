import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';

interface ToggleTruncateTextTypographyProps {
    content: string;
    maxLength: number;
}

const ToggleTruncateTextTypography = ({ content, maxLength }: ToggleTruncateTextTypographyProps) => {
    const [text, setText] = React.useState(content);
    const [isShowMore, setIsShowMore] = useState(false);
    const [isShowLess, setIsShowLess] = useState(false);

    const handleToggle = () => {
        if (isShowMore) {
            setText(content);
            setIsShowLess(true);
            setIsShowMore(false);
        } else {
            setText(`${text.slice(0, maxLength)}... `);
            setIsShowMore(true);
            setIsShowLess(false);
        }
    };

    useEffect(() => {
        if (text?.length > maxLength) {
            setText(`${text.slice(0, maxLength)}... `);
        }
    }, []);

    useEffect(() => {
        if (text?.length > maxLength) {
            setIsShowMore(true);
        }
    }, [content]);

    return (
        // write logic to show more or less text
        <Typography.Paragraph onClick={e => e.stopPropagation()}>
            <div
                onClick={e => e.stopPropagation()}
                dangerouslySetInnerHTML={{
                    __html: text,
                }}
            />
            {isShowLess && (
                <Typography.Link
                    style={{
                        marginLeft: '10px',
                        color: '#1890ff',
                    }}
                    onClick={e => {
                        e.stopPropagation()
                        handleToggle();
                    }}
                >
                    Read Less
                </Typography.Link>
            )}
            {isShowMore && (
                <Typography.Link
                    style={{
                        marginLeft: '10px',
                        color: '#1890ff',
                    }}
                    onClick={e => {
                        e.stopPropagation()
                        handleToggle();
                    }}
                >
                    Read More
                </Typography.Link>
            )}
        </Typography.Paragraph>
    );
};

export default ToggleTruncateTextTypography;
