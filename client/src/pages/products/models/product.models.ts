export interface Product {
    key: number;
    id: number;
    category_id: number;
    name: string;
    brand: string;
    quantity_per_box: number;
    ean: string;
    code_supplier: string;
    image: string;
    douane: string;
    weight: string;
    shoppingCart: { id: number, quantities: number }
}

export const FormatProduct = (data: any[]): Product[] => data.map((product: Product) => ({
    ...product,
    shoppingCart: { id: product.shoppingCart?.id ?? null, quantities: product.shoppingCart?.quantities ?? 0 }
}))
