import {AxiosResponse} from "axios";

import {axiosService} from "./axios.service";
import {IActivateLink, IAuth, ITokens, IUser} from "../interfaces";
import {IRes} from "../types";
import {urls} from "../constants";

class AuthService {
    private readonly accessKey = 'access';
    private readonly refreshKey = 'refresh';

    async login(user: IAuth): Promise<IUser> {
        const {data}: AxiosResponse<ITokens> = await axiosService.post(urls.authAPI.auth, user);
        this.setTokens(data);
        const {data: me}: AxiosResponse<IUser> = await this.me();
        return me;
    };

    async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error('Refresh token is not exist!');
        }
        const {data}: AxiosResponse<ITokens> = await axiosService.post(
             urls.authAPI.refresh,
            {refresh: refreshToken});
        this.setTokens(data);
    };

    activateRequestUser(formData: FormData, token: string): Promise<void> {
        return axiosService.post(urls.authAPI.activateRequest(token), formData);
    };

    activateUser(formData: FormData): IRes<IUser> {
        return axiosService.post(urls.authAPI.activateUser, formData);
    };

    recoveryPassword(formData: FormData): IRes<IUser> {
        return axiosService.post(urls.authAPI.recoveryPassword, formData);
    };

    recoveryPasswordRequest(formData: FormData, token: string): Promise<void> {
        return axiosService.post(urls.authAPI.recoveryPasswordRequest(token), formData);
    };

    getActivateLink(id: string): IRes<IActivateLink> {
        return axiosService.get(urls.authAPI.linkActivate(id));
    };

    me(): IRes<IUser> {
        return axiosService.get(urls.authAPI.me);
    };

    getAccessToken(): string {
        return localStorage.getItem(this.accessKey);
    };

    private getRefreshToken(): string {
        return localStorage.getItem(this.refreshKey);
    };

    private setTokens({access, refresh}: ITokens): void {
        localStorage.setItem(this.accessKey, access);
        localStorage.setItem(this.refreshKey, refresh);
    };

    deleteTokens(): void {
        localStorage.clear();
    };
}

export const authService = new AuthService();

