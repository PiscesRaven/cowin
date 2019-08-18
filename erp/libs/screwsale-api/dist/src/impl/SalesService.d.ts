export declare class SalesService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    getOrderList(): Promise<any>;
    updateOrderRetailerPrice(orderId: string, retailerUID: string, price: number): Promise<any>;
}
