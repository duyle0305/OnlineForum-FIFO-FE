import { Breadcrumb, Button } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TagXSvg from '/public/tag-x.svg';
import { RightOutlined } from '@ant-design/icons';

interface Props {
    title?: string;
}

const PageBreadcrumbs = ({title} : Props) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [history, setHistory] = useState<string>('');

    const splitPath = location.pathname.split('/');

    if (splitPath.length > 2) {
        splitPath.pop();
    }

    const pathSnippets = splitPath.filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        let url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return {
            path: url,
            breadcrumbName: (
                <Link to={url} onClick={() => setHistory(location.pathname)}>
                    {title || url.split('/').splice(-1)?.[0]}
                </Link>
            ),
        };
    });

    const breadcrumbItems = [
        {
            ...(location.pathname.split('/').length > 1 && {
                path: '-1',
                breadcrumbName: (
                    <Button
                        size="small"
                        type="text"
                        icon={<img src={TagXSvg} alt="tag-x" />}
                        onClick={() => {
                            setHistory(location.pathname);
                            navigate(-1);
                        }}
                    />
                ),
            }),
        },
        ...extraBreadcrumbItems,
        {
            ...(location.pathname.length < history.length &&
                history.includes(location.pathname) && {
                    path: '1',
                    breadcrumbName: <RightOutlined onClick={() => navigate(history)} />,
                }),
        },
    ];
    return (
        <Breadcrumb>
            {breadcrumbItems.map(item => (
                <React.Fragment key={item.path}>
                    <Breadcrumb.Item>{item.breadcrumbName}</Breadcrumb.Item>
                </React.Fragment>
            ))}
        </Breadcrumb>
    );
};

export default PageBreadcrumbs;
