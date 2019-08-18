import { Order } from '../data/Data';
export declare class RetailerService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    createReplenishingOrder(order: Order): Promise<any>; /*! order should have productItemId and number */
    acceptOrder(orderId: string): Promise<any>;
    rejectOrder(orderId: string): Promise<any>;
    updateOrderPrice(orderId: string, price: number): Promise<any>;
    getProductItemList(retailerId: string): Promise<any>;
    getCategoryList(retailerId: string): Promise<any[]>;
}
