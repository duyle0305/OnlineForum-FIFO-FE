import { Flex, Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import BaseButton from "../core/button";
import { SuccessfulIcon } from "@/utils/asset";
import { css } from "@emotion/react";
import AuthFormTitle from "./form-title";
import AuthFormDescription from "./form-desciption";

interface AuthResultPageProps {
    title?: string
    description?: string
    btnNavigateTo?: string
    btnText?: string
    icon?: string
}
const AuthResultPage: FC<AuthResultPageProps> = ({ title, description, btnNavigateTo, btnText, icon }) => {
    return <div css={styles}>
        <Flex vertical align="center" style={{ width: "100%" }}>
            {icon && (
                <img className="result-success-icon" src={icon} alt="Success Icon" />
            )}

            {title && (
                <div className="result-title">
                    <AuthFormTitle title={title} />
                </div>
            )}

            {description && (
                <div className="result-description">
                    <AuthFormDescription description={description} />
                </div>
            )}

            {btnNavigateTo && btnText && (
                <Link className="result-btn" to={btnNavigateTo}>
                    <BaseButton
                        size="large"
                        variant="outlined"
                        shape="round"
                        type="primary"
                    >
                        {btnText}
                    </BaseButton>
                </Link>
            )}
        </Flex>
    </div>
}


const styles = css(`
    .result-success-icon {
        margin-bottom: 40px;
    }

    .result-title {
        display: block;
        margin-bottom: 10px !important;
    }

    .result-btn {
        margin-top: 40px;
        width: 100%;
    }
    
`)
export default AuthResultPage