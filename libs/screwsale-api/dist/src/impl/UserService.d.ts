import { User } from '../data/Data';
export declare class UserService {
    private env;
    private onLogoutListener;
    constructor();
    init(env: string): Promise<void>;
    private log;
    createUser(user: User, authorizedCategoryIds: string[]): Promise<void>; /*! the obj of user should have email, password ,role. role should be 'admin', 'agent', 'staff', 'supplier', 'retailer', 'franchiser'  */
    updateUser(email: string, user: User, authorizedCategoryIds: string[]): Promise<any>;
    removeUser(email: string): Promise<any>; /*! should have email */
    login(email: string, password: string, onLogoutListener: Function): Promise<any>;
    logout(): Promise<void>;
    getToken(): string;
    fetchToken(): Promise<void>;
}
