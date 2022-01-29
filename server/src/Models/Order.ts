import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"
import { State } from "./State"
import { Terminal } from "./Terminal"
import { User } from "./User"

@Entity()
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date

	@Column({ type: "int" })
	totalAmount: number

	@ManyToOne(() => User, (user) => user.orders, {
		nullable: true
	})
	user: User

	@ManyToOne(() => Terminal, (terminal) => terminal.orders, {
		nullable: false
	})
	terminal: Terminal

	@ManyToOne(() => State, (state) => state.orders)
	state: State

	@ManyToMany(() => Product, (product) => product.has)
	products: Product[]
}
