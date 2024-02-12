export interface ProductVariant {
    volume: string,
    name: string,
    pcb: number,
    code: number,
    quantity?: number,
    productId: number,
}

export interface Product {
    title: string,
    subTitle: string,
    brand: string,
    images: string[],
    origin: string,
    variant: ProductVariant[]
}