import { IProfile } from "./profile.interface";

export interface IComment {
    id: number;
    comment: string;
    created_at: string;
    profile: IProfile;
}
