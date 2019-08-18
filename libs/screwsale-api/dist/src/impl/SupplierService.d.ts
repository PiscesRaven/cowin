export declare class SupplierService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    getOrderList(): Promise<any>;
    updateBid(orderId: string, bidPrice: number): Promise<any>;
    updateOrderStatus(orderId: string, status: string): Promise<any>;
}
