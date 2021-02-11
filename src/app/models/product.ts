export interface Product {
    id?: number;
    title: string;
    price: number;
    stock: number;
    isAddedIntoCart?: boolean;
    isFavourite?: boolean;
}
