const ApiPaths = {
    SIGNIN: "authenticate/login",
    SIGNUP: "authenticate/sign-up",
    REFRESH_TOKEN: "authenticate/refresh",
    
    GET_ACCOUNT_BY_USERNAME: "/account/find/by-username",

    GET_WALLET_BY_ACCOUNT_ID: "wallet/get-by-account-id",
}

const ApiConfigs = {
    TIME_OUT_MS: 60000,
    API_SUCCESS_CODE: 0
}

export {
    ApiPaths,
    ApiConfigs
}