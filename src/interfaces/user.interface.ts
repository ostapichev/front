import { IProfile } from "./profile.interface";

export interface IUser {
    id?: number;
    email: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login?: string;
    created_at: string;
    profile?: IProfile;
}
