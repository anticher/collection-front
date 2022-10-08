export interface IUser {
    username: string;
    email: string;
    password: string;
    createDate: string;
    lastLoginDate?: any;
    id: string;
    isBlocked: boolean;
    role: string;
}