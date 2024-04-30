import { axiosService } from "./axios.service";
import { IGroup } from "../interfaces";
import { IRes } from "../types";
import { urls } from "../constants";

class GroupService {
    getAll(): IRes<IGroup[]> {
        return axiosService.get(urls.groupsAPI.groups);
    };

    create(group: IGroup): IRes<IGroup> {
        return axiosService.post(urls.groupsAPI.groups, group);
    };
}

export const groupService = new GroupService();
