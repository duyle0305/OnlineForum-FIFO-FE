import 'dayjs/locale/zh-cn';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { App as AntApp, Flex, Spin } from 'antd';
import { Suspense } from 'react';

import { history, HistoryRouter } from '@/routes/history';

import QueryProvider from './components/provider/query-provider';
import MainLayout from './layout/main-layout';
import RenderRouter from './routes';

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
