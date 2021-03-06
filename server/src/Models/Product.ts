import {
	BaseEntity,
	Column,
	Entity,
	Generated,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm"
import { Category } from "./Category"
import { Image } from "./Image"
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

	@Column({ default: false })
	custom: boolean

	@Column({ default: true })
	available: boolean

	@ManyToOne(() => Category, (category) => category.products)
	category: Category

	@OneToMany(() => ProductToOrder, (productToOrder) => productToOrder.product, {
		cascade: true
	})
	public productToOrders!: ProductToOrder[]

	@ManyToMany(() => Ingredient, (ingredient) => ingredient.has, {
		cascade: true,
		onDelete: "CASCADE"
	})
	ingredients: Ingredient[]

	@OneToOne(() => Image, (image) => image.product, { cascade: true })
	@JoinColumn()
	image: Image
}
