import { BaseEntity, Column, Entity, Generated, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./Category"
import { Product } from "./Product"

@Entity()
export class Ingredient extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "varchar", length: 255 })
	name: string

	@Column({ type: "int" })
	quantity: number

	@Column()
	important: boolean

	@ManyToMany(() => Product, (product) => product.ingredients)
	@JoinTable()
	has: Product[]
}
