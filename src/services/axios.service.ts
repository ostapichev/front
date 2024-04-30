import axios, { AxiosError } from "axios";
import { createBrowserHistory } from 'history';

import { authService } from "./auth.service";
import { baseURL, urls } from "../constants";
import { IFuncVoid } from "../types";

const axiosService = axios.create({ baseURL });
const waitList: IFuncVoid[] = [];
const history = createBrowserHistory({ window });
let isRefreshing = false;

axiosService.interceptors.request.use(response => {
    const access = authService.getAccessToken();
    if (access) {
        response.headers.Authorization = `Bearer ${access}`;
    }
    return response;
});

axiosService.interceptors.response.use(response => {
        return response;
    },
    async (error: AxiosError) => {
        const request = error.config;
        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await authService.refresh();
                    isRefreshing = false;
                    afterRefresh();
                    return axiosService(request);
                } catch (e) {
                    isRefreshing = false;
                    authService.deleteTokens();
                    history.replace('./login?expSession=true');
                    return Promise.reject(error);
                }
            }
            if (request.url === urls.authAPI.refresh) {
                return Promise.reject(error);
            }
            return new Promise(resolve => {
                subscribeToWaitList(() => {
                    resolve(axiosService(request));
                })
            })
        }
        return Promise.reject(error);
    }
);

const subscribeToWaitList = (cb: IFuncVoid): void => {
    waitList.push(cb);
};

const afterRefresh = () => {
    while (waitList.length) {
        const cb = waitList.pop();
        cb();
    }
};

export {
    axiosService,
    history
};
