import AuthFormWrapper from '@/components/authen/form-wrapper';
import AuthPageLayout from '@/components/authen/layout';
import BaseButton from '@/components/core/button';
import { useResetPassword } from '@/hooks/mutate/auth/use-reset-password';
import { useMessage } from '@/hooks/use-message';
import { RootState } from '@/stores';
import { PATHS } from '@/utils/paths';
import { LockOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Form, FormProps, Input } from 'antd';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    password: string;
    confirmPassword: string;
};

const CreateNewPasswordPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.global);
    const email = useSelector((state: RootState) => state.account.email);
    const [form] = Form.useForm();

    const message = useMessage();
    const { mutate: resetPassword } = useResetPassword();

    // Function to validate password confirmation
    const validateConfirmPassword = (_: any, value: string) => {
        const password = form.getFieldValue('password');

        if (value && value !== password) {
            return Promise.reject(new Error('Passwords do not match!'));
        }

        return Promise.resolve();
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async values => {
        resetPassword(
            {
                email: email as string,
                password: values.password,
                confirmPassword: values.confirmPassword,
            },
            {
                onSuccess: () => {
                    navigate(PATHS.SIGNIN);
                    message.success('Password has been reset successfully');
                },
                onError: err => {
                    message.error(err?.message || 'Something went wrong');
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
                    title="Create new password"
                    description="Your new password must be unique from those previously used."
                >
                    <Form form={form} initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password size="large" width={100} placeholder="Password" prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Please input your confirm password!' },
                                {
                                    validator: validateConfirmPassword, // Custom validator for password match
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                width={100}
                                placeholder="Confirm Password"
                                prefix={<LockOutlined />}
                            />
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
                                Reset Password
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

export default CreateNewPasswordPage;
