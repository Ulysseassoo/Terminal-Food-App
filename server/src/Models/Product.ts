import { BaseEntity, Column, Entity, Generated, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./Category"
import { Order } from "./Order"
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

	@ManyToMany(() => Order)
	@JoinTable()
	orders: Order[]
}
