import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product, (prod) => prod.shoppingCart)
    @JoinColumn({ name: "productId" })
    product: Product;

    @Column()
    productId: number;

    @Column()
    quantity: number;
}
