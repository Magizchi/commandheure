import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product, product => product.shoppingCart)
    @JoinColumn()
    product: Product;

    @Column()
    quantities: number;
}
