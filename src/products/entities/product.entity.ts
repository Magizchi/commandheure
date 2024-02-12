import { Category } from "src/categories/entities/category.entity";
import { ShoppingCart } from "src/shopping-cart/entities/shopping-cart.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: "category_id" })
    category: number;

    @Column()
    category_id: number;

    @Column()
    title: string;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column()
    quantity_per_box: string;


    @Column()
    ean: string;

    @Column()
    code_supplier: number;

    @Column()
    image_path: string;

    @Column()
    douane: string;

    @Column()
    weight: string;

    @Column({ nullable: true })
    image: string

    @OneToOne(() => ShoppingCart, (shop) => shop.productId)
    shoppingCart: ShoppingCart
}
