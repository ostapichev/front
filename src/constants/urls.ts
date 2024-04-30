const baseURL = 'http://localhost:8000/api';
const url = 'http://localhost:3000';
const orders = '/orders';
const groups = '/groups';
const users = '/users';
const activate = '/activate';
const linkActivate = '/activate_link';
const admin = `/admin`;
const auth = '/auth';
const comments = '/comments'
const recoveryPassword = '/recovery_password';
const statistic = '/statistic';
const urls = {
    groupsAPI: {
        groups: `${groups}`,
        createOrder: (id: string): string => `${groups}/${id}/order`
    },
    ordersAPI: {
        orders: `${orders}`,
        createExel: `${orders}/exel`,
        byID: (id: string): string => `${orders}/${id}`
    },
    usersAPI: {
        users: `${admin}${users}`
    },
    adminAPI: {
        createUser: `${admin}${users}`,
        orderStatistic: `${admin}${statistic}${orders}`,
        userStatistic: (id: string): string => `${admin}${statistic}${users}/${id}`,
        banUser: (id: string): string => `${admin}${users}/${id}/ban`,
        unbanUser: (id: string): string => `${admin}${users}/${id}/unban`,
    },
    authAPI: {
        linkActivate: (id: string): string => `${auth}${linkActivate}/${id}`,
        activateRequest: (token: string): string => `${auth}${activate}/${token}`,
        recoveryPasswordRequest: (token: string): string => `${auth}${recoveryPassword}/${token}`,
        activateUser:`${auth}${activate}`,
        recoveryPassword: `${auth}${recoveryPassword}`,
        activate,
        auth,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`
    },
    commentsApi: {
        createComment: (id: string): string => `${orders}/${id}${comments}`
    }
};

export {
    baseURL,
    urls,
    url
};
