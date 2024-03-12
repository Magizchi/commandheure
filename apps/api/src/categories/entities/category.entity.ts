import { Company } from "src/companies/entities/company.entity";
import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Company, company => company.category)
    @JoinColumn({ name: "company_id" })
    company: number;

    @Column()
    company_id: number;

    @OneToMany(() => Product, (product) => product.category_id)
    products: Product[];
}
