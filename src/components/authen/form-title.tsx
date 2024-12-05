import { Typography } from "antd";
import { FC } from "react";

interface AuthFormTitleProps {
    title: string
}

const AuthFormTitle: FC<AuthFormTitleProps> = ({ title }) => {
    return <Typography.Title
        level={2}
        color="#343434">{title}
    </Typography.Title>
}

export default AuthFormTitle;