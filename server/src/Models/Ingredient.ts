import { BaseEntity, Column, Entity, Generated, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./Category"
import { Product } from "./Product"
import { Stock } from "./Stock"

@Entity()
export class Ingredient extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "varchar", length: 255 })
	name: string

	@Column()
	important: boolean

	@OneToOne(() => Stock, (stock) => stock.ingredient, { onDelete: "CASCADE", onUpdate: "CASCADE" })
	stock: Stock

	@ManyToMany(() => Product, (product) => product.ingredients)
	@JoinTable()
	has: Product[]
}
