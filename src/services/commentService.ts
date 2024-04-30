import { axiosService } from "./axios.service";
import { IRes } from "../types";
import { IComment } from "../interfaces";
import { urls } from "../constants";

class CommentService {
    create(order_id: string, comment: IComment): IRes<IComment> {
        return axiosService.post(urls.commentsApi.createComment(order_id), comment);
    };
}

export const commentService = new CommentService();
