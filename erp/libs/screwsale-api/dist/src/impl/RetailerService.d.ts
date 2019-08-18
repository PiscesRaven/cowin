import { Order, OrderType } from '../data/Data';
export declare class RetailerService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    createOrder(order: Order, type: OrderType): Promise<any>;
    setProductNumber(productId: string, number: number, soldNumber: number): Promise<any>;
    updateOrderPrice(orderId: string, price: number): Promise<any>;
    getProductList(retailerId: string): Promise<any>;
    getCategoryList(retailerId: string): Promise<any[]>;
}
