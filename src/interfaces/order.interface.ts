import { IComment } from "./comment.interface";
import { IProfile } from "./profile.interface";

export interface IOrder {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    age?: number;
    course?: string;
    course_format?: string;
    course_type?: string;
    status?: string;
    sum?: number;
    alreadyPaid?: number;
    created_at?: string;
    group?: number;
    manager?: IProfile;
    me?: string;
    msg?: string;
    utm?: string;
    comments?: IComment[];
}
