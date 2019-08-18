import { Product, Category } from '../data/Data';
export declare class StaffService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    createProduct(product: Product): Promise<any>;
    createCategory(category: Category): Promise<any>;
    removeProduct(productId: string): Promise<any>;
    removeCategory(categoryId: string): Promise<any>;
    updateProduct(productId: string, product: Product): Promise<any>;
    updateCategory(categoryId: string, category: Category): Promise<any>;
    getProductList(retailerId: string): Promise<any>;
    getCategoryList(retailerId: string): Promise<any[]>;
    getOrderList(): Promise<any>;
    updateOrderStatus(orderId: string, status: string): Promise<any>;
    chooseSupplier(orderId: string, chosenSupplierUID: string): Promise<any>;
    finishOrder(orderId: string): Promise<any>;
}
