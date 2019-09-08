import { Product, Category } from '../data/Data';
export declare class StaffService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    createProduct(product: Product): Promise<any>; /*! product should have categoryId */
    createCategory(category: Category): Promise<any>; /*! category cannot be blank */
    removeOrder(orderId: string): Promise<any>; /*! order should have productItemId and number and retailerId */
    removeProduct(productId: string): Promise<any>;
    removeCategory(categoryId: string): Promise<any>;
    updateProduct(productId: string, product: Product): Promise<any>; /*! productId and product cannot be blank! */
    updateCategory(categoryId: string, category: Category): Promise<any>; /*! categoryId and category cannot be blank! */
    getProductList(): Promise<any>;
    getCategoryList(): Promise<any[]>;
    getProductItemList(categoryId: string): Promise<any>;
    getOrderList(): Promise<any>;
    updateOrderStatus(orderId: string, status: string): Promise<any>;
    chooseBiddingSupplier(orderId: string, chosenSupplierIds: string[]): Promise<any>;
    chooseBiddingWinner(orderId: string, chosenSupplierId: string): Promise<any>;
}
