export interface ITokens {
    access: string;
    refresh: string;
}

export interface IActivateLink {
    token?: string;
    msg?: string;
}
