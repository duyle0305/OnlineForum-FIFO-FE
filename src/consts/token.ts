import { theme, ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#262d34',
        colorInfo: '#262d34',
        colorBgBase: '#262d34',
        borderRadius: 8,
    },
    components: {
        Input: {
            algorithm: true,
            colorBorder: 'transparent',
            borderRadius: 6,
            colorBgContainer: '#2C353D',
        },
        Select: {
            algorithm: true,
            colorBorder: 'transparent',
            borderRadius: 6,
            colorBgContainer: '#2C353D',
        },
        Menu: {
            algorithm: true,
            itemSelectedBg: '#2C353D',
            itemSelectedColor: '#fff',
            itemPaddingInline: 4,
        },
        Card: {
            algorithm: true,
            borderRadius: 16,
            colorBorderSecondary: 'transparent',
        },
        Tag: {
            algorithm: true,
            borderRadiusSM: 20,
            colorBgBase: '#2C353D',
            colorBorder: 'transparent',
            colorText: '#C5D0E6',
            marginXS: 0,
            fontSizeSM: 10,
        },
        Typography: {
            algorithm: true,
            titleMarginTop: 0,
            marginXS: 0,
            marginXXS: 0,
        },
        Button: {
            algorithm: true,
            colorPrimary: '#007AFF',
            borderRadius: 20,
            borderRadiusSM: 20,
            colorLink: '#007AFF',
            linkDecoration: 'underline',
        },
        Tabs: {
            itemColor: '#fff',
            itemSelectedColor: '#fff',
            itemHoverColor: '#007AFF',
            inkBarColor: '#007AFF',
        },
        Spin: {
            colorPrimary: '#007AFF',
        },
        Breadcrumb: {
            linkColor: '#fff',
        },
        DatePicker: {
            algorithm: true,
            colorBorder: 'transparent',
            borderRadius: 6,
            colorBgContainer: '#2C353D',
        },
    },
    algorithm: theme.darkAlgorithm,
};
