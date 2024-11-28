import 'dayjs/locale/zh-cn';

import { Flex, Spin } from 'antd';
import { Suspense } from 'react';

import { history, HistoryRouter } from '@/routes/history';

import { App as AntApp } from 'antd';
import QueryProvider from './components/provider/query-provider';
import MainLayout from './layout/main-layout';
import RenderRouter from './routes';

const App: React.FC = () => {
    return (
        <AntApp>
            <QueryProvider>
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
            </QueryProvider>
        </AntApp>
    );
};

export default App;
