export declare type Role = 'admin' | 'staff' | 'sales' | 'supplier' | 'retailer' | 'franchiser';
export declare type ProductType = 'special' | 'normal';
export declare type OrderType = 'normal' | 'replenishing' | 'special';
export declare type OrderStatus = 'choosingSupplier' | 'salesBiding' | 'retailerBiding' | 'franchiserChoosing' | 'rejected' | 'finished';
export declare interface User {
    _id: string;
    email: string;
    password: string;
    role: Role;
    name: string;
    phoneNumber: string;
    address: string;
    bonus: number;
    GuiNumber: string;
    WeChat: string;
    selectRegion: string;
    retailerId?: string;
}
export declare interface Category {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    retailerId: string;
}
export declare interface Product {
    _id: string;
    name: string;
    category: string;
    type: ProductType;
    description: string;
    imageUrl: string;
    size: string;
    color: string;
    number: number;
    soldNumber: number;
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
    productId: string;
    retailerId: string;
}
