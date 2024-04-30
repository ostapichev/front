export interface IErrorGroup {
    name?: string[];
}

export interface IErrorUser {
    email?: string[];
    name?: string[];
    surname?: string[];
}

export interface IErrorOrder {
    group?: number;
    email?: string[];
    name?: string[];
    surname?: string[];
    phone?: string[];
    age?: string[];
    sum?: string[];
    already_paid?: string[];
}

export interface IErrorAuth {
    detail?: string[];
}

export interface IErrorComment {
    comment?: string[];
}
