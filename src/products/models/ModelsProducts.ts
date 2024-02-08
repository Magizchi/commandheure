export interface ProductForFront {
    title: string,
    subTitle: string,
    brand: string,
    images: string[],
    origin: string,
    variant: {
        volume: string,
        name: string,
        pcb: number,
        code: number,
    }[]
}