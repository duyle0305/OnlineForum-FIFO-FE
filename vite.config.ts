import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    esbuild: {
        define: {
            this: 'window',
        },
    },

    server: {
        port: 3000,
    },

    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),

        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style: name => `antd/es/${name}/style/index.css`,
                },
                {
                    libName: 'lodash',
                    libDirectory: '',
                    camel2DashComponentName: false,
                    style: () => {
                        return false;
                    },
                },
            ],
        }),
        svgrPlugin({
            svgrOptions: {
                icon: true,
                // ...svgr options (https://react-svgr.com/docs/options/)
            },
        }),
    ],
});
