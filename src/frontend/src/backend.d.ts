import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderItem {
    unitPriceINR: bigint;
    quantity: bigint;
    product: string;
}
export interface OrderConfirmation {
    id: bigint;
    totalINR: bigint;
    upiRef: string;
    timestamp: bigint;
    buyer: string;
    items: Array<OrderItem>;
}
export interface UserProfile {
    name: string;
    minecraftUsername?: string;
}
export interface OrderPayload {
    upiRef: string;
    buyer: string;
    items: Array<OrderItem>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(payload: OrderPayload): Promise<bigint>;
    getAllOrders(): Promise<Array<OrderConfirmation>>;
    getBestSellingProducts(): Promise<Array<[string, bigint]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getItemsByProduct(product: string): Promise<Array<OrderItem>>;
    getOrderById(orderId: bigint): Promise<OrderConfirmation | null>;
    getOrdersByBuyer(buyer: string): Promise<Array<OrderConfirmation>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
