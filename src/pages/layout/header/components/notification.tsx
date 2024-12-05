import { PATHS } from "@/utils/paths";
import { BellOutlined } from "@ant-design/icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NotificationIcon: FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <BellOutlined onClick={() => {
                navigate(PATHS.NOTIFICATION)
            }}/>
        </div>
    )
}

export default NotificationIcon;