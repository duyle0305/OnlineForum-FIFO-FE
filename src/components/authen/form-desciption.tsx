import { Typography } from "antd";
import { FC } from "react";

interface AuthFormDescriptionProps {
    description: string
}

const AuthFormDescription: FC<AuthFormDescriptionProps> = ({ description }) => {
    return <Typography.Text
        className='text'
        color="#8391a1"
    >
        {description}
    </Typography.Text>
}

export default AuthFormDescription;