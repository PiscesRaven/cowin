export declare class SalesService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    getOrderList(): Promise<any>;
    getRetailerList(): Promise<any>;
    getProductItemList(retailerId: string, categoryId: string): Promise<any>;
    getCategoryList(): Promise<any[]>;
    updateOrderRetailerPrice(orderId: string, retailerId: string, price: number): Promise<any>;
}
