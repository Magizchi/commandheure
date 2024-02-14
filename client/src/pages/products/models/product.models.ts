export interface ProductVariant {
    volume: string,
    name: string,
    pcb: number,
    code: number,
    quantity?: number,
    id: number,
}

export interface Product {
    id: number;
    title: string,
    subTitle: string,
    brand: string,
    images: string[],
    origin: string,
    variant: ProductVariant[]
}