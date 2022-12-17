export class CreateProductDto {
    constructor(
        public categoryId: string,
        public name: string,
        public brand: string,
        public quantity_per_box: string,
        public ean: string,
        public code_supplier: string,
        public image_path: string,
        public douane: string,
        public weight: string,
    ) { }
}
