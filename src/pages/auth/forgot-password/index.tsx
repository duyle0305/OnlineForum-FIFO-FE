import AuthFormWrapper from '@/components/authen/form-wrapper';
import AuthPageLayout from '@/components/authen/layout';
import BaseButton from '@/components/core/button';
import { useForgetPassword } from '@/hooks/mutate/auth/use-forget-password';
import { useMessage } from '@/hooks/use-message';
import { setAccountState } from '@/stores/account';
import { PATHS } from '@/utils/paths';
import { MailOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Form, FormProps, Input } from 'antd';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    email: string;
};

const ForgotPasswordPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.global);

    const { mutate } = useForgetPassword();

    const { success, error } = useMessage();

    const onFinish: FormProps<FieldType>['onFinish'] = async values => {
        mutate(
            { email: values.email },
            {
                onSuccess: () => {
                    success('Please check your email to reset password');
                    dispatch(setAccountState({ email: values.email }));
                    navigate(PATHS.OTP_RESET_PASSWORD)
                },
                onError: err => {
                    error(err?.message || 'Something went wrong');
                },
            },
        );
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
        // Do something on failed submit form
    };

    return (
        <div css={styles}>
            <AuthPageLayout>
                <AuthFormWrapper
                    title="Forgot Password?"
                    description="Don't worry! It occurs. Please enter the email address linked with your account."
                >
                    <Form initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item<FieldType>
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'PLease input a valid email!' },
                            ]}
                        >
                            <Input size="large" width={100} placeholder="Enter your email" prefix={<MailOutlined />} />
                        </Form.Item>

                        <Form.Item>
                            <BaseButton
                                size="large"
                                className="auth-submit-button"
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                            >
                                Send code
                            </BaseButton>
                        </Form.Item>
                    </Form>
                </AuthFormWrapper>
            </AuthPageLayout>
        </div>
    );
};

const styles = css(`
    .link-forgot-password {
        text-align: right;
    }

    .link-create-account {
        text-align: center;
        color: #ccc;
    }
    
    .divider span {
        color: #ccc;
    }
    
    .btn-google,.btn-registration {
        color: #3949AB;
    }
`);

export default ForgotPasswordPage;
