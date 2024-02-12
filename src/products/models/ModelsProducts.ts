export interface ProductForFront {
    title: string,
    subTitle: string,
    brand: string,
    images: string[],
    origin: string,
    variant: {
        productId: number,
        volume: string,
        name: string,
        pcb: number,
        code: number,
        quantity?: number
    }[]
}