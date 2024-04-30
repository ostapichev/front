import { AxiosRequestConfig } from "axios";

import { axiosService } from "./axios.service";
import { IOrderStatistic, IParams, IUser, IUserStatistic } from "../interfaces";
import { IRes, IResPaginate } from "../types";
import { urls } from "../constants";

class AdminService {
    getAll(params: IParams): IResPaginate<IUser[]> {
        const config: AxiosRequestConfig = { params };
        return axiosService.get(urls.usersAPI.users, config);
    };

    create(user: IUser): IRes<IUser> {
        return axiosService.post(urls.adminAPI.createUser, user);
    };

    ban(id: string): IRes<IUser> {
        return axiosService.patch(urls.adminAPI.banUser(id));
    };

    unban(id: string): IRes<IUser> {
        return axiosService.patch(urls.adminAPI.unbanUser(id));
    };

    getStatisticOrder(): IRes<IOrderStatistic> {
        return axiosService.get(urls.adminAPI.orderStatistic);
    };

    getStatisticUser(id: string): IRes<IUserStatistic> {
        return axiosService.get(urls.adminAPI.userStatistic(id));
    };
}

export const adminService = new AdminService();
