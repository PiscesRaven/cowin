import { Order } from '../data/Data';
export declare class FranchiserService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    createSpecialOrder(order: Order, productName: string): Promise<any>; /*! order should have productItemId, retailerId and number attrs. */
    createNormalOrder(order: Order): Promise<any>; /*! order should have productItemId, retailerId and number attrs. */
    updateOrderStatus(orderId: string, status: string): Promise<any>;
    acceptOrder(orderId: string): Promise<any>;
    rejectOrder(orderId: string): Promise<any>;
    getOrderList(): Promise<any>;
}
