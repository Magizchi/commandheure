export class CreateShoppingCartDto {
    constructor(
        public quantities: number,
        public productId: number,
    ) { }
}
