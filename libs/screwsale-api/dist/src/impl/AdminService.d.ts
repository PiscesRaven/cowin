export declare class AdminService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    getUserList(): Promise<any[]>;
    getOrderList(): Promise<any>;
    getSoldProductResult(): Promise<any>;
}
