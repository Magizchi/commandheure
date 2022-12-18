import { Category } from "src/categories/entities/category.entity";
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
    name: string;

    @Column()
    brand: string;

    @Column()
    quantity_per_box: string;

    @Column()
    ean: string;

    @Column()
    code_supplier: string;

    @Column()
    image_path: string;

    @Column()
    douane: string;

    @Column()
    weight: string;

}
