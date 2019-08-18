export declare class SalesService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    getOrderList(): Promise<any>;
    updateOrderRetailerPrice(orderId: string, retailerId: string, price: number): Promise<any>;
}
