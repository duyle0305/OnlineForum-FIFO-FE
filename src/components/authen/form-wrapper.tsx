import { css } from "@emotion/react";
import { Col, Row, Space, Typography } from "antd";
import { FC } from "react";
import AuthFormTitle from "./form-title";
import AuthFormDescription from "./form-desciption";

interface AuthFormWrapperProps {
    title?: string;
    description?: string;
}

const AuthFormWrapper: FC<AuthFormWrapperProps> = ({ title, description, children }) => {
    return <Row justify="center" align="middle" css={styles} gutter={{ xs: 6 }}>
        {
            title && <Col className="title" span={24}>
                <AuthFormTitle title={title} />
            </Col>
        }
        {
            description && <Col className="description">
                <AuthFormDescription description={description} />
            </Col>
        }
        <Col className="form" span={24}>
            {children}
        </Col>
    </Row>
}

const styles = css(`
    max-width: 400px; 
    width: 80%; 

    .title {
        text-align: center;
        margin-bottom: 40px;
    }

    .description {
        margin-bottom: 40px;
    }

    .form {
        width: 100%;

        button {
            width: 100%;
        }

        .auth-submit-button {
            margin-top: 20px;
        }
    }
`)

export default AuthFormWrapper;