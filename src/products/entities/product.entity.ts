import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category, category => category.id)
    categoryId: string;

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
