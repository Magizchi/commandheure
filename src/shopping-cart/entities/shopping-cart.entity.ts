import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShoppingCart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number


    @OneToOne(() => Product, product => product.code_supplier)
    @JoinColumn({ name: 'code_supplier' })
    test: Product

    @Column()
    order: number;
}
