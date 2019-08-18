import { User } from '../data/Data';
export declare class UserService {
    private env;
    private onLogoutListener;
    constructor();
    init(env: string): Promise<void>;
    private log;
    createUser(user: User): Promise<void>;
    updateUser(email: string, user: User): Promise<any>;
    removeUser(email: string): Promise<any>;
    login(email: string, password: string, onLogoutListener: Function): Promise<any>;
    logout(): Promise<void>;
    getToken(): string;
    fetchToken(): Promise<void>;
}
