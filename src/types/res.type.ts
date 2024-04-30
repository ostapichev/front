import { AxiosResponse } from "axios";

import { IPagination } from "../interfaces";

export type IRes<T> = Promise<AxiosResponse<T>>;
export type IResPaginate<T> = IRes<IPagination<T>>;
