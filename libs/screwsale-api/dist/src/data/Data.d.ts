export declare type Role = 'admin' | 'staff' | 'sales' | 'supplier' | 'retailer' | 'franchiser';
export declare type OrderType = 'normal' | 'replenishing' | 'special';
export declare type OrderStatus = 'choosingSupplier' | 'salesBiding' | 'retailerBiding' | 'franchiserChoosing' | 'rejected' | 'preparing' | 'shipping' | 'finished';
export declare interface User {
    _id: string;
    email: string;
    password: string;
    role: Role;
    name: string;
    phoneNumber: string;
    address: string;
    bonus: number;
    GuiNumber: string; /*! 統一編號 */
    WeChat: string;
    selectRegion: string;
    retailerId?: string; /*! 只有在經銷商建立加盟店時會有的值 */
    authorizedCategoryIds: any; /*! ex: {'test123': true} */
}
export declare interface Category {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
}
export declare interface Product {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    size: string;
    color: string;
    categoryId: string;
}
export declare interface productItem {
    _id: string;
    number: number;
    soldNumber: number;
    product: Product;
    productId: string;
    retailerId: string;
}
export declare interface Order {
    _id: string;
    imageUrl: string;
    type: OrderType;
    description: string;
    number: number;
    size: string;
    color: string;
    source: string;
    owner: string;
    status: OrderStatus;
    chosenSuppliers: any; /*! ex: {'wergd123': {_id: 'wergd123', bidPrice: 500, isWinner: false | '' | undefined | null }, 'ttyyffhwi123': { _id: 'ttyyffhwi123', bidPrice: 300, isWinner: true }  } */
    retailers: any; /*! ex: { _id: "test123", price: 300 } */
    updatingStaff: StaffObj;
    biddingSupplierWinnerId: string;
    productItemId: string;
    retailerId: string;
}
export declare interface StaffObj {
    email: string;
    updatedTime: number; /*! ex: 1566053045860 */
}
