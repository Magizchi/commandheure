export class CreateProductDto {
    constructor(
        public category_id: number,
        public category: number,
        public name: string,
        public brand: string,
        public quantity_per_box: string,
        public ean: string,
        public code_supplier: number,
        public image_path: string,
        public douane: string,
        public weight: string,
    ) { }
}
