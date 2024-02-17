export class CreateShoppingCartDto {
    constructor(
        public quantity: number,
        public productId: number,
    ) { }
}
