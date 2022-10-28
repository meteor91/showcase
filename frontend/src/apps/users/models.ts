export interface IUser {
    username: string;
    id: string;
    role: EUserRole;
}

export interface ILoginForm {
    username: string;
    password: string;
}

export interface IUserDetails extends IUser {
    themesCount: {
        accepted: number;
        onModeration: number;
        declined: number;
    }
}

export enum EUserRole {
    MODERATOR = 'MODERATOR',
    BASIC = 'BASIC',
}
