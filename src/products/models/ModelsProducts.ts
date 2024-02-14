export interface ProductForFront {
    key: number,
    title: string,
    subTitle: string,
    brand: string,
    images: string[],
    origin: string,
    variant: {
        id: number,
        volume: string,
        name: string,
        pcb: number,
        code: number,
        quantity?: number
    }[]
}