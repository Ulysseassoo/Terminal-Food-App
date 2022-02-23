import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@OneToOne(() => Product, (product) => product.image)
	product: Product
}
