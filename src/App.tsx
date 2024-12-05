import 'dayjs/locale/zh-cn';

import { Flex, Spin } from 'antd';
import { Suspense } from 'react';

import { history, HistoryRouter } from '@/routes/history';

import { App as AntApp } from 'antd';
import QueryProvider from './components/provider/query-provider';
import MainLayout from './layout/main-layout';
import RenderRouter from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App: React.FC = () => {
    return (
        <AntApp>
            <QueryProvider>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <HistoryRouter history={history}>
                        <Suspense
                            fallback={
                                <MainLayout>
                                    <Flex justify="center">
                                        <Spin size="large" />
                                    </Flex>
                                </MainLayout>
                            }
                        >
                            <RenderRouter />
                        </Suspense>
                    </HistoryRouter>
                </GoogleOAuthProvider>
            </QueryProvider>
        </AntApp>
    );
};

export default App;
