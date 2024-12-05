import GooglIcon from '@/assets/icons/Google.svg';
import AuthFormWrapper from '@/components/authen/form-wrapper';
import AuthPageLayout from '@/components/authen/layout';
import BaseButton from '@/components/core/button';
import { authKeys } from '@/consts/factory/auth';
import { LocalStorageKeys } from '@/consts/local-storage';
import { useSignIn } from '@/hooks/mutate/auth/use-signin';
import { setAccountState } from '@/stores/account';
import { SignInRequest } from '@/types/auth';
import { PATHS } from '@/utils/paths';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useQueryClient } from '@tanstack/react-query';
import { App, Divider, Form, FormProps, Input } from 'antd';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
    username?: string;
    password?: string;
};

const SignInPage: FC = () => {
    const navigate = useNavigate();
    const { mutate: signIn, isPending } = useSignIn();
    const queryClient = useQueryClient();
    const { message } = App.useApp();
    const dispatch = useDispatch();

    const [token, setToken] = useState('');

    const login = useGoogleLogin({
        onSuccess: tokenResponse => setToken(tokenResponse.access_token),
    });

    const onFinish: FormProps<FieldType>['onFinish'] = async values => {
        const payload: SignInRequest = {
            username: values.username ?? '',
            password: values.password ?? '',
        };

        signIn(payload, {
            onSuccess: data => {
                message.success('Login successfully!');
                queryClient.invalidateQueries({
                    queryKey: authKeys.profile(),
                });
                dispatch(
                    setAccountState({
                        logged: true,
                    }),
                );

                const entity = data.entity;

                localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, entity.token);
                localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_KEY, entity.refreshToken);
                localStorage.setItem(LocalStorageKeys.USERNAME_KEY, payload.username);

                navigate(PATHS.HOME);
            },
            onError: error => {
                message.error(error.message);
            },
        });
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
        // Do something on failed submit form
    };

    const handleLoginGoogle = () => {
        login();
    };

    return (
        <div css={styles}>
            <AuthPageLayout>
                <AuthFormWrapper title="SIGN IN">
                    <Form initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item<FieldType>
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input size="large" width={100} placeholder="Username" prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                size="large"
                                width={100}
                                placeholder="Password"
                                prefix={<LockOutlined />} // Add lock icon
                            />
                        </Form.Item>

                        <div className="link-forgot-password">
                            <p>
                                <Link to={PATHS.FORGOT_PASSWORD}>Forgot password?</Link>
                            </p>
                        </div>

                        <Form.Item>
                            <BaseButton
                                size="large"
                                className="auth-submit-button"
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                loading={isPending}
                            >
                                Login
                            </BaseButton>
                        </Form.Item>
                    </Form>

                    <Divider plain className="divider">
                        <span>Or</span>
                    </Divider>

                    <BaseButton
                        size="large"
                        variant="outlined"
                        shape="round"
                        className="btn-google"
                        disabled={isPending}
                        onClick={handleLoginGoogle}
                    >
                        <img src={GooglIcon}></img>
                        <span>Google</span>
                    </BaseButton>

                    <div className="link-create-account">
                        <p>Have no acount yet?</p>
                    </div>

                    <BaseButton
                        size="large"
                        variant="outlined"
                        shape="round"
                        className="btn-registration"
                        disabled={isPending}
                    >
                        <Link to={PATHS.SIGNUP}>
                            <span>Registration</span>
                        </Link>
                    </BaseButton>
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

export default SignInPage;
