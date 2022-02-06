import { BaseEntity, Column, Entity, Generated, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./Category"
import { Ingredient } from "./Ingredient"
import { Order } from "./Order"
import { ProductToOrder } from "./ProductToOrder"
import { User } from "./User"

@Entity()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "varchar", length: 255 })
	name: string

	@Column({ type: "text" })
	description: string

	@Column({ type: "text" })
	calories: string

	@Column({ type: "int" })
	price: number

	@Column()
	custom: boolean

	@ManyToOne(() => Category, (category) => category.products)
	category: Category

	@OneToMany(() => ProductToOrder, (productToOrder) => productToOrder.product, {
		cascade: true
	})
	public productToOrders!: ProductToOrder[]

	@ManyToMany(() => Ingredient, (ingredient) => ingredient.has, {
		cascade: true
	})
	ingredients: Ingredient[]
}
