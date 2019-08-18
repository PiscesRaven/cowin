import { Order } from '../data/Data';
export declare class FranchiserService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    getProductList(category: string, retailerId: string): Promise<any[]>;
    getCategoryList(retailerId: string): Promise<any[]>;
    createSpecialOrder(order: Order, productName: string): Promise<any>;
    createNormalOrder(order: Order): Promise<any>;
    setProductNumber(productId: string, number: number, soldNumber: number): Promise<any>;
    updateOrderStatus(orderId: string, status: string): Promise<any>;
    acceptOrder(orderId: string): Promise<any>;
    rejectOrder(orderId: string): Promise<any>;
    getOrderList(): Promise<any>;
}
