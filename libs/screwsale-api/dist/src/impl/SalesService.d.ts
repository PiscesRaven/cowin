export declare class SalesService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    getOrderList(): Promise<any>;
    getRetailerList(): Promise<any>;
    getProductItemList(retailerId: string, categoryId: string): Promise<any>;
    removeOrder(orderId: string): Promise<any>; /*! order should have orderId */
    getCategoryList(): Promise<any[]>;
    updateOrderPrice(orderId: string, retailerId: string, price: number): Promise<any>;
}
