export type UserCredentialsCookie = {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    access_token: string;
    refresh_token: string;
    rememberMe: boolean;
    message: string;
};

export type LocalUser = {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    message: string;
};

export type SessionCookie = {
    id: string;
    access_token: string;
    refresh_token: string;
};

export interface AccessDataResponse {
    access_token: string;
}
